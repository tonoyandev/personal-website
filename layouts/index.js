import dynamic from 'next/dynamic'

const layouts = {
  About: dynamic(() => import(`@/layouts/About`)),
  Contact: dynamic(() => import(`@/layouts/Contact`)),
  Services: dynamic(() => import(`@/layouts/Services`)),
  Home: dynamic(() => import(`@/layouts/Home`)),
  Post: dynamic(() => import(`@/layouts/Post`)),
  Blog: dynamic(() => import(`@/layouts/Blog`)),
  Projects: dynamic(() => import(`@/layouts/Projects`)),
  Reviews: dynamic(() => import(`@/layouts/Reviews`)),
  Blank: dynamic(() => import(`@/layouts/Blank`)),
  BlankCenter: dynamic(() => import(`@/layouts/BlankCenter`)),
}

export default layouts
