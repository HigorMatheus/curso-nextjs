
import SEO from '@/components/SEO';
import { client } from '@/lib/pismic';
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import {Title} from '../styles/pages/Home'
import Prismic from 'prismic-javascript'
import{Document} from 'prismic-javascript/types/documents';
import PrismikDom from 'prismic-dom'



interface IHomeProps{
  recommendedProducts: Document[]
}

export default function Home({ recommendedProducts }:IHomeProps) {



  return (
   <div>
     <SEO 
     title="DevCommercer, seu ecormmercer top" 
     image="boost.png" 
     shouldExcludeTitleSuffix
     />
     <section>

      <Title>Products</Title>
      <ul>
        {recommendedProducts.map(recommendedProduct=>{
          return(
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismikDom.RichText.asText(recommendedProduct.data.title)}
                
                </a>
              </Link>
         
            </li>
          )
        })}
      </ul>
     </section>

    
   </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async()=>{
   const response = await client().query([
    Prismic.Predicates.at('document.type','product')
   ])
  return{
    props:{
      recommendedProducts: response.results
    }
  }
}