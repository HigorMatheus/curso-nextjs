import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'

const AddToCartModal = dynamic(
  () =>  import('@/components/AddToCartModal'),
  {loading:()=> <p>Loading</p>, ssr:false}
)

export const Product = () => {
  const route = useRouter()
  const [isAddToCartModalVisible, setIsAddToCartModalVisible]= useState(false)

  const handleAddToCart= useCallback(()=>{
    setIsAddToCartModalVisible(!isAddToCartModalVisible)
  },[])
  return(

    <div>
      <h1>{route.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible&& <AddToCartModal/>}

      
</div>
  )
    
    
}