import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from './Pagination'
const MoviesList = ({ movies , getPage ,pageCount}) => {
    return (
        <Row className="mt-3">
        {movies.length >=1?(
            movies.map((mov)=>{
                return(
                    <CardMovie key={mov.id} mov={mov}/>
                )
            })
        ):<h3 className="text-center p-5">لا يوجد افلام ...</h3>}
        {movies.length >= 1 ? (
            <PaginationComponent getPage={getPage} pageCount={pageCount}/>
        ): null}
        </Row>
    );
};

export default MoviesList;