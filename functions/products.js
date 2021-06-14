require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appIrSscxyH0k3Cqw')
  .table('products')


exports.handler = async (event, context, cb) => {
    const {id} = event.queryStringParameters
    //if there is an ID, try to get data from airtable
    if(id) {
        try {
            const product = await airtable.retrieve(id)
            if(product.error) {
                return {
                    statusCode:404,
                    body: `No product with id: ${id}`
                }
            } else {
                return {
                    statusCode:200,
                    body: JSON.stringify(product)
                }
            }
        } catch (error) {
            return {
                statusCode:500,
                body: `Server Error`
            }
        }
        
    }
    try {
        const { records } = await airtable.list()
        const products = records.map((product)=> {
            const { id } = product;
            const { name, images, price, sizes, brand, description, category, featured, shipping } = product.fields;
            const image1 = images[0].url
            const image2 = images[1].url
            const image3 = images[2].url
            const image4 = images[3].url
            return { id, name, image1, image2, image3, image4, price, sizes, brand, description, category, featured, shipping}
        })
        return {
            statusCode:200,
            body: JSON.stringify(products)
        }

    } catch (error) {
        return {
            statusCode:500,
            body: 'Server Error'
        }
    }
}