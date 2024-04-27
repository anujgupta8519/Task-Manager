import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminAuth({children, authentication=true}) {
    const navigate = useNavigate();
    const [loder,setLoder] = useState(true);
   

    useEffect(()=>{
        if (authentication) {
            navigate('/login')
            
        }else if(!authentication ){
            navigate('/')

        }
        setLoder(false)
    },[navigate,authentication])
  return loder? <h2>Loding...</h2> :<>{children}</>
}

export default AdminAuth