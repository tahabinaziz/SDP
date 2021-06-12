const Snackbar =()=>{
    const [snackbar, setSnackbar] = useState(false)
    return(
        <div>
            <div id="snackbar" {...snackbar}>Some text some message..</div>
            {
            snackbar?(<div id="snackbar" {...snackbar}>Some text some message..</div>):null
        }
        </div>
        
    )
}
export default Snackbar;