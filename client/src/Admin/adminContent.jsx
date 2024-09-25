import 'bootstrap/dist/css/bootstrap.min.css';
import Tables from './Tables/tables';
import Reviews from './reviews';
import Analytics from './analytics';

export default function AdminContent({page}){
    return(
        <div className='w-5/6 h-full bg-zinc-500'>
            <Tables active={page.activePage}/>
            <Reviews active={page.activePage} />
            <Analytics  active={page.activePage}/>

        </div>
    )
}