import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Newsitem(props) {
    const [states, setstates] = useState({ articles: [] })
    const [page, setpage] = useState(1)
    const [items, setitems] = useState()
    const [loading, setloading] = useState(false)


    useEffect(() => {
        setloading(true)
        props.setProgress(30)
        let url = `https://newsapi.org/v2/top-headlines?country=au&category=${props.catagory}&apiKey=dc66cf554d67497b9d47e3f5d75a9243&page=${page}&pageSize=8`
        let data = fetch(url)
            .then((response) => {
                props.setProgress(70)
                return response.json()

            }).then((response) => {
                setstates({ articles: response.articles })
                setitems(response.totalResults)
                setloading(false)
                document.title = `NewsMonkey - ${capitalizeFirstLetter(props.catagory)}`
                props.setProgress(100)
            })
    }, [])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const fetchMoreData = async () => {

        setpage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=au&category=${props.catagory}&apiKey=dc66cf554d67497b9d47e3f5d75a9243&page=${page + 1}&pageSize=8`
        let data = await fetch(url)
        let parseddata = await data.json()
        setstates({ articles: states.articles.concat(parseddata.articles) })
        setitems(parseddata.totalResults)
    }


    return (
        <>
            <div className='container my-3'>
                <h1 className='mb-2 text-center' style={{ marginTop: '6rem' }}>Newsmonkey - Top {props.catagory} headlines</h1>
                <InfiniteScroll

                    dataLength={states.articles.length}
                    next={fetchMoreData}
                    hasMore={ true ? states.articles.length != items : false }
                    loader={<div className='container' style={{ height: '100px', width: '100px' }} key={states.articles.url} >
                                <Loading key={states.articles.url}/>
                            </div>}
                    endMessage={
                        <p style={{ textAlign: 'center' }} >
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className='container'>

                        <div className='row row-cols'>
                            {states.articles.map((element) => {
                                {
                                    if (element.urlToImage) {

                                        return <div className='col-md-3 my-3' key={element.title}>
                                            <div className="card" >
                                                <img src={element.urlToImage} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <span className="badge bg-secondary">{element.source.name}</span>
                                                    <h5 className="card-title">{element.title}</h5>
                                                    <p className="card-text">{element.description}</p>
                                                    <p className="card-text">By <cite>{element.author ? element.author : 'anonymous'}</cite> at <cite>{new Date(element.publishedAt).toUTCString()}</cite></p>
                                                    <a href={element.url} target='_blank' className="btn btn-primary btn-sm">Read More</a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                }
                            })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>


    )
}
