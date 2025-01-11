import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title,description,keyword}) => {

  return (
    <>
    <Helmet>
    <title>{title}</title>
    <meta name='description' content={description}/>
    <meta name='keyword' content={keyword}/>
    </Helmet>
    </>
  )
}

Title.defaultProps={
    title:'Shop',
    description:'You can get here your desired gadget here',
    keyword:'Apple iPhone Router'
}
export default Title