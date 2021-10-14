import { Client } from "@notionhq/client"
import axios from 'axios';
import {} from 'dotenv/config'


const notion = new Client({ auth: process.env.NOTION_KEY });

const geocoder = async(location) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.API_KEY}`)
    const lng = response.data.results[0].geometry.location.lng
    const lat = response.data.results[0].geometry.location.lat
    return [lng, lat]

};

(async() => {
    console.log(await geocoder())
})()

export const getDatabase = async() => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.query({ database_id: databaseId });

    let map1 = await Promise.all(response.results.map(async page => {
        return {
            name: page.properties.Client.title[0].text.content,
            address: page.properties.Address.rich_text[0].plain_text,
            org: page.properties.Organization.select.name,
            geocode: await geocoder(page.properties.Address.rich_text[0].plain_text),
        }
    }));
    console.log(map1)
    return map1
};