import React  from 'react'
import { useDispatch , connect } from "react-redux";
import { movepage, order  } from "../../redux/actions";

export  function Pagination({pagination,videogames,movepage}) {
    const dispatch = useDispatch();
    const pageNumbers = [];
    let maxPage = Math.ceil(videogames.count/15);
    if(maxPage>1){
    for(let i = 1; i <= maxPage ; i++) {
        pageNumbers.push(i);
        };}
  

    function back(){
        if(pagination.idPageNow >1) 
        {dispatch(movepage({idPageNow:--pagination.idPageNow}));}
                   };

    function forward(){
        if(pagination.idPageNow <maxPage) 
        { 
          dispatch(movepage({idPageNow:++pagination.idPageNow}));}};
  return (
    <div>
         <ul className="logo">
           {maxPage>1?
            <button className="pages" key="a"
             onClick={() => back()}>   ATRAS </button>
            :null}  
                 {pageNumbers.map(number =>
                <button className={pagination.idPageNow===number? 'on':'off'} key={number}
                        onClick={() => {dispatch(movepage({idPageNow:number}));}}
                        value={number} 
                > {number} </button>
                   )} 
                  
                  {maxPage>1?<button className="pages" key="b" 
                        onClick={() => forward()}>ADELANTE </button>
                   :null}
                   
   </ul>
   
  </div>
  )
}

const mapStateToProps = (state) => {
    return {
        videogames: state.products,
        pagination: state.pagination
    }; };

  function mapDispatchToProps(dispatch) {
    return {
       movepage: (number) => dispatch(movepage(number)),
       order: (cb) => dispatch(order(cb))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pagination);