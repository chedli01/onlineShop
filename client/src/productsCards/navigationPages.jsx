import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { actualPagination } from "../home";

export default function NavigationPages({products}) {
  axios.defaults.withCredentials = true;
  const store = useContext(actualPagination);
 

  return (
    <div className="w-full h-1/6  flex flex-col items-center justify-center space-y-4">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            onClick={(event) => {
              if (store.max-3 >= 3) {
                store.setMax(store.max - 3);
              }
            }}
          >
            <a class="page-link"  aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {
          products.map((item, index) => {

            if(products.length%3!=0){
            
            if ((index <= Math.floor(products.length / 3))) {
              return (
                <li
                  onClick={async (event) => {
                    await store.setMax((index + 1)*3);
                  }}
                  class="page-item"
                  key={index}
                >
                  <a class="page-link" >
                    {index + 1}
                  </a>
                </li>
              );
            }
          }
          else{
            if (index <products.length / 3) {
              return (
                <li
                  onClick={async (event) => {
                    await store.setMax((index + 1)*3);
                  }}
                  class="page-item"
                  key={index}
                >
                  <a class="page-link" >
                    {index + 1}
                  </a>
                </li>
              );
            }

          }
          })}

          <li
            class="page-item"
            onClick={(event) => {
              if (store.max < products.length) {
                store.setMax(store.max + 3);
              }
            }}
          >
            <a class="page-link"  aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
     
      
    </div>
  );
}
