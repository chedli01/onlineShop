import 'bootstrap/dist/css/bootstrap.min.css';
import Tables from './Tables/tables';
import Reviews from './reviews';
import Analytics from './analytics';
import { useState,useEffect } from 'react';
import Chat from '../chat';

export default function AdminContent({page}){



    return(
       
        <div className='w-5/6 h-full bg-zinc-500'>
           
            <Chat   chat={page.activePage=="chat"}/>
           
         
            <Tables active={page.activePage}/>
            <Reviews active={page.activePage} />
            <Analytics  active={page.activePage}/>

        </div>
    )
}