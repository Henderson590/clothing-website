import bb from "../assets/black-back.png"
import bf from "../assets/black-front.png"
import gb from "../assets/gray-back.png"
import gf from "../assets/gray-front.png"
import wb from "../assets/white-back.png"
import wf from "../assets/white-front.png"
import lsbf from "../assets/LS-black-front.png"
import lsgf from "../assets/LS-gray-front.png"
import lswf from "../assets/LS-white-front.png"
import fnb from "../assets/fake-news-black-mockup.png"
import fnw from "../assets/fake-news-white-mockup.png"
import flb from "../assets/flower-black-mockup.png"
import flw from "../assets/flower-white-mockup.png"
import lfb from "../assets/live-fast-black.png"
import lfw from "../assets/live-fast-white.png"

// Seed products kept in code for fallback when Supabase is unavailable.
export const products = [
  {
    id: 1,
    name: "Define Defiance - Tee",
    price: 30,
    description: "• The Define Defiance - Tee is made from 100% combined cotton. \n• Standard fit with a relaxed and easy feel. \nATTENTION: This is a pre-purchase item and will ship when the pre-purchase period ends. Also, please allow time for production and shipping of the item.*",
    category: "Define Defiance",
    categoryGroup: "",
    addToGroup: true, // Set to false to hide this category from grouped filters
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Grey"], // More colors will be added later
    images: [
      bb,
      bf,
      gb,
      gf,
      wb,
      wf // INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200)
    ],
    featured: false,
    limitedEdition: false,
    disabled: false,
    newArrival: true
  },
  {
    id: 2,
    name: "Define Defiance - Long Sleeve",
    price: 35,
    description: "• The Define Defiance - Long Sleeve is made from 100% combined cotton. \n• Standard fit with a relaxed and easy feel. \nATTENTION: This is a pre-purchase item and will ship when the pre-purchase period ends. Also, please allow time for production and shipping of the item.*",
    category: "Define Defiance",
    categoryGroup: "",
    addToGroup: true, // Set to false to hide this category from grouped filters
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Grey"], // More colors will be added later
    images: [ 
      lsgf,
      lswf,
      lsbf
    ], // INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200)
    featured: false,
    limitedEdition: false,
    disabled: true,
    newArrival: true
  },
  {
    id: 3,
    name: "Midnight Garden - Tee",
    price: 30,
    description: "• The Midnight Garden - Tee is made from 100% combined cotton. \n• Standard fit with a relaxed and easy feel. \nATTENTION: This is a pre-purchase item and will ship when the pre-purchase period ends. Also, please allow time for production and shipping of the item.*",
    category: "Midnight Garden",
    categoryGroup: "",
    addToGroup: true, // Set to false to hide this category from grouped filters
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White"], // More colors will be added later
    images: [
      flb,
      flw
    ], // INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200)
    featured: false,
    limitedEdition: false,
    disabled: false,
    newArrival: true
  },
  {
    id: 4,
    name: "Lost Truth - Tee",
    price: 30,
    description: "• The Lost Truth - Tee is made from 100% combined cotton. \n• Standard fit with a relaxed and easy feel. \nATTENTION: This is a pre-purchase item and will ship when the pre-purchase period ends. Also, please allow time for production and shipping of the item.*",
    category: "Lost Truth",
    categoryGroup: "",
    addToGroup: true, // Set to false to hide this category from grouped filters
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White"], // More colors will be added later
    images: [
      fnw,
      fnb
    ], // INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200)
    featured: false,
    limitedEdition: false,
    disabled: false,
    newArrival: true
  },
  {
    id: 4,
    name: "Live Fast, Die Hard - Tee",
    price: 30,
    description: "• The Live Fast, Die Hard - Tee is made from 100% combined cotton. \n• Standard fit with a relaxed and easy feel. \nATTENTION: This is a pre-purchase item and will ship when the pre-purchase period ends. Also, please allow time for production and shipping of the item.*",
    category: "Live Fast, Die Hard",
    categoryGroup: "",
    addToGroup: true, // Set to false to hide this category from grouped filters
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White"], // More colors will be added later
    images: [
      lfw,
      lfb
    ], // INSERT PRODUCT IMAGE HERE (recommended size: 1200x1200)
    featured: false,
    limitedEdition: false,
    disabled: false,
    newArrival: true
  }
]

// Build category data from a provided list.
export const getCategoryData = (list) => {
  const categoriesSet = new Set(["All"])
  const groupMap = {}

  list.forEach(product => {
    categoriesSet.add(product.category)

    // Only include in grouped filter if addToGroup is true (default)
    if (product.categoryGroup && product.addToGroup !== false) {
      if (!groupMap[product.categoryGroup]) {
        groupMap[product.categoryGroup] = new Set()
      }
      groupMap[product.categoryGroup].add(product.category)
    }
  })

  // Convert sets to arrays for UI
  const groups = Object.fromEntries(
    Object.entries(groupMap).map(([group, cats]) => [group, Array.from(cats)])
  )

  return {
    categories: Array.from(categoriesSet),
    groups
  }
}

// Get featured products from a provided list
export const getFeaturedProducts = (list, limit = 3) => {
  return list.filter(product => product.featured).slice(0, limit)
}

