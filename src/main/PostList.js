import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PostListElement from "./PostListElement";
import { useLocation, useSearchParams } from "react-router-dom";

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
               {id : element['id'], title : element['title'], author : element['author'], lastModifiedDate : element['lastModifiedDate'], view : element['view']}
            ))
        })
        .then(showingData => {
            changeOldestId(showingData, direction, nextBigPage)
            bigPage.current = nextBigPage
            setPosts(showingData)
        })
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
    
    useEffect(() => {
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
                <div onClick={() => moveBigPage(-1)}>
                    이전
                </div>
                {getSmallPages().map(smallPageNum => (
                    <div key={smallPageNum} onClick={() => setSmallPage(smallPageNum)}>{smallPageNum}</div>
                ))}
                <div onClick={() => moveBigPage(1)}>
                    다음
                </div>
            </div>
        </div>
    )
}