import React, { useState } from 'react'

function ProductForm() {
    const [formData, setFormData] = useState({
        name: "",
        descreption: "",
        price: "",
        quantity: ""
    })
  return (
    <div className='w-[60%] mx-auto bg-gray-600'>
        <p className='text-3xl text-center text-amber-400'>hello </p>                                                                                                                                                                                                                                                                                                                                                                        
    </div>
  )
}

export default ProductForm