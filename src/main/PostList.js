import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PostListElement from "./PostListElement";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import checkJwtExpired from "../utils/checkJwtExpired";

export default function PostList() {
    function moveBigPage(direction) {

        const nextBigPage = bigPage.current + direction
        if(!checkMoveBigPage(nextBigPage, direction)) {
            return false
        }

        const oldestId = oldestPostId.current[nextBigPage]
        const params = createListParams(oldestId)
        setPostList(params, direction, nextBigPage)

        setSmallPage(1)
    }

    function checkMoveBigPage(nextBigPage, direction) {
        if(direction === -1) {
            if(nextBigPage < 0) {
                return false;
            }
            return true;
        }

        if(direction === 1) {
            if(bigPage.current === -1) {
                return true
            }

            const smallPagesCount = parseInt(posts.length / singleSmallPageSize)
            if(smallPagesCount < smallPagesInView) {
                return false;
            }

            return true
        }
    }

    function createListParams(oldestId) {
        const result = {oldestId: oldestId}
        if(searchParams.has('category')){
            result['category'] = searchParams.get('category')
        }
        
        return result
    }

    function setPostList(params, direction, nextBigPage) {
        axios.get('/post/list',{params: params})
        .then(res => {
            if(!res) {
                return []
            }
            return res.data.map(element => (
               {id : element['id'], title : element['title'], author : element['author'], lastModifiedDate : formatDateTime(element['last_modified_date']), view : element['view']}
            ))
        })
        .then(showingData => {
            changeOldestId(showingData, direction, nextBigPage)
            bigPage.current = nextBigPage
            setPosts(showingData)
        })
    }

    function formatDateTime(rawDateTime) {
        let date = new Date(rawDateTime);

        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let seconds = ("0" + date.getSeconds()).slice(-2);

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    function changeOldestId(postData, direction) {
        const nextOldestId = postData[postData.length - 1]['id']
            if(direction === 1) {
                oldestPostId.current.push(nextOldestId)
                return true
            }

            oldestPostId.current.pop()
            oldestPostId.current[bigPage] = nextOldestId
    }

    function getSmallPages() {
        const smallPages = []
        const len = posts.length
        let smallPageNum = parseInt(len / singleSmallPageSize)
        if(len % singleSmallPageSize !== 0) {
            smallPageNum++
        }
        for(let smallPage = 1; smallPage <= smallPageNum; smallPage++) {
            smallPages.push(smallPage)
        }
        return smallPages;
    }

    const [posts, setPosts] = useState([])
    const [smallpage, setSmallPage] = useState(1)
    const singleSmallPageSize = 50
    const smallPagesInView = 10
    const bigPage = useRef(-1)
    const oldestPostId = useRef([-1])
    const [searchParams, setSearchParams] = useSearchParams();
    const { search } = useLocation();
    const [isLogin, setIsLogin] = useState()
    
    useEffect(() => {
        setIsLogin(checkJwtExpired())
        bigPage.current = -1
        oldestPostId.current = [-1]
        moveBigPage(1)
    }, [search, searchParams])

    return (
        <div>
            <ul className="postList">
                {
                posts.slice((smallpage - 1) * singleSmallPageSize, smallpage * singleSmallPageSize).map(post => (
                    <PostListElement element = {post} key={post['id']}/>
                ))
                }
            </ul>
            <div className="jumpPage">
                <div className="smallPageButton" onClick={() => moveBigPage(-1)}>
                    이전
                </div>
                {getSmallPages().map(smallPageNum => (
                    <div key={smallPageNum} className={smallPageNum === smallpage ? 'smallPageSelected' : 'smallPageButton'} onClick={() => setSmallPage(smallPageNum)}>{smallPageNum}</div>
                ))}
                <div className="smallPageButton" onClick={() => moveBigPage(1)}>
                    다음
                </div>
                {searchParams.has('category') && !isLogin &&
                    <Link to='/post/edit' state = {{'category' : searchParams.get('category'), 'title' : null, 'content' : null}}>
                        <button>
                            글쓰기
                        </button>
                    </Link>
                }
                
            </div>
        </div>
    )
}