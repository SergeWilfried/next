if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),u={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d76e58eabaae5cfc570f54d2aaa2875f"},{url:"/_next/static/_lIKI1YPqunPDCA8f--ww/_buildManifest.js",revision:"cf13a1318437ed4989119efbfd141ffe"},{url:"/_next/static/_lIKI1YPqunPDCA8f--ww/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1437-00bdf8b67fa7acd9.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/1463-5fdf0e73df8177a0.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/1930-f73f29d95cd78f29.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/2284-16dcb7ac79e4428f.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/2323-e1e8cbeb4b0d4b03.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/2369-eceafb8c70966d5f.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/266-918ca58bcc5d28e6.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/2915-5ad08e4e5a1f696a.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/343-7cd4a2098b17f9ee.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/3862-08b3aa663eaafdbc.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/4038-77bb8a7af78e1e6f.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/4213-d86c97045b98eab6.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/4408-86320fc1e87667f1.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/4558-a3ed90bd4f04c56b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/4633-e618982484857091.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/5-2cb7d3e8c86b1138.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/5159-6c823be6b790962e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/55393f3c-055f5cf4aee42db2.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/5601-e555bfd23f001f05.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/5726-d16e79a509a88f3b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/6229-551a804723d09a7d.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/6268-fb9de5bca9999db6.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/7045-881ec0750e34cbd4.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/718-a145b6acf0979394.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/722-15da6918e4c57863.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/7250-36361737aa4533d3.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/7427-5a2416a097504e95.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/769-a94a983d3720e71a.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/7964-4aeb7eeec507ddec.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/8127-1b30fd0bd1b34dc0.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/84fbfe7f-85df45ee01bef5cf.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/8661-acba4170b61f3647.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/8774-ed58c68fc4e191da.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/9174-b66885adb91dd06e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/9185-a935a9651d7cc476.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/9552-58c44f914c06c5e8.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/9873-1452abcf1feec366.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(auth)/layout-a3a5ea0999226490.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(auth)/login/page-2e764d68d897fbf2.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(auth)/register/page-bcc55868f3781e09.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(docs)/docs/%5B%5B...slug%5D%5D/page-d7100734eb8b10cf.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(docs)/docs/layout-9eb27626b083d565.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(docs)/guides/%5Bslug%5D/page-561fd1121328c4d9.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(docs)/guides/page-1f0ab42c3a576aaf.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(docs)/layout-81ecc47d628f2c4e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/%5Bslug%5D/page-a54db5c140a8da9d.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/(blog-post)/blog/%5Bslug%5D/page-056b387e630a2bd0.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/blog/category/%5Bslug%5D/page-08482f9867e13325.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/blog/layout-4cb3e2996002ff7c.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/blog/page-00b89cc52f7f50a2.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/error-90afbf1728376983.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/layout-7c40211016820154.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/not-found-9152f0fb4078d2d7.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/page-a85a70d3b5bb453b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/pricing/loading-1310c5192f9babf5.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(marketing)/pricing/page-76862c2938d8e8d5.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/accounting/loading-88e8c68cf04d7ae0.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/accounting/page-518764dfed285b63.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/applications/loading-59406a6ef4a0101a.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/applications/page-b268986660606467.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/attendance/loading-9177487d659d9391.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/attendance/page-f05967c59114a53c.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/calendar/loading-f3f077577271aa0e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/calendar/page-26dd2de5c9bfee7c.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/class/loading-3a9cbdc11deee0da.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/class/page-3525c9dc348f3e09.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/donations/loading-c78bf17568d80743.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/donations/page-45453398014bf787.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/enrollments/loading-cace00c8fd1880e4.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/enrollments/page-a437e449c32cea24.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/grades/loading-5746f15d9490a0e1.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/grades/page-61aaa8407b78270e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/layout-5e5fa1e80fe969d8.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/loading-c5aab15aff3d94cf.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/orders/loading-ee90f123f2e858b2.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/orders/page-27ab4e5d6abf6a9b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/page-8c5596d377379b5d.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/parents/loading-6d684752fb9810f3.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/parents/page-44903d7034f2ce75.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/reports/loading-992a0022f2e8572b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/reports/page-352fe9984bcb93fe.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/staff/loading-da885f529ab298a5.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/staff/page-a20f6c56273695e4.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/students/loading-465b8a49d51c1520.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/admin/students/page-3776a2bcbf1e30a0.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/billing/loading-9c2aa3a8d007103e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/billing/page-0f1ea5a77e452f17.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/charts/loading-d579dc0d90012949.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/charts/page-47ca8edba6b82a67.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/loading-2e5d7ebb1c85a377.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/page-30047430e91cb632.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/settings/loading-a056502414eb877e.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/dashboard/settings/page-34e30088e1b77e39.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/(protected)/layout-c146048e9579dd9b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/_not-found/page-62083dba388e3bc9.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/app/layout-65ad5edad726388c.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/bbbaa7c5-94be2fdec3d4a5ed.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/fa313612-41a3ade5537f0b80.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/framework-20afca218c33ed8b.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/main-077e0b67dca734d8.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/main-app-a7e8cfff6d69ece6.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/pages/_app-e0987b753d014e4d.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/pages/_error-5a74292126752391.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-487cb89ff9bb5df5.js",revision:"_lIKI1YPqunPDCA8f--ww"},{url:"/_next/static/css/45a6a8d6489d6174.css",revision:"45a6a8d6489d6174"},{url:"/_next/static/css/75f15d2e3fd9f6fd.css",revision:"75f15d2e3fd9f6fd"},{url:"/_next/static/css/a5b67b823b48c7d4.css",revision:"a5b67b823b48c7d4"},{url:"/_next/static/media/01af0fc7b4278e65-s.p.woff2",revision:"6fa778aa9ee280df9ff563f3a08b0350"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/8cdee4d3ed444abc-s.woff2",revision:"420e1e96628860fae605e46bd196926d"},{url:"/_next/static/media/90475aac776488b6-s.p.woff2",revision:"183db31d6365283bef4914042be9dfab"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/e11418ac562b8ac1-s.p.woff2",revision:"0e46e732cced180e3a2c7285100f27d4"},{url:"/_static/avatars/mickasmt.png",revision:"6865fec785deea40942680cff3125f2c"},{url:"/_static/avatars/shadcn.jpeg",revision:"5d65323be696d0f9e0abc71bb2a6f7c2"},{url:"/_static/blog/blog-post-1.jpg",revision:"d91bb1224212bd1a832f99fe7494554f"},{url:"/_static/blog/blog-post-2.jpg",revision:"04442fcb79e9538e65be3476b2b6aa3a"},{url:"/_static/blog/blog-post-3.jpg",revision:"a758717dd624c5900385151290cf378d"},{url:"/_static/blog/blog-post-4.jpg",revision:"135c157ecc4dfcbac1ebe27a04f40d84"},{url:"/_static/docs/gg-auth-config.jpg",revision:"8e10e48df3a501dc502c36bb581b7247"},{url:"/_static/favicons/android-chrome-192x192.png",revision:"b978b46f31a53cc58dee7658950d7ae5"},{url:"/_static/favicons/android-chrome-512x512.png",revision:"3bcd5e4781b970a5043988462ed924cd"},{url:"/_static/favicons/apple-touch-icon.png",revision:"b5d3ba9c2426ac2cf48d3624dbea5acb"},{url:"/_static/favicons/favicon-16x16.png",revision:"e8b487ad7a04f0d411efa33d0fdfa68c"},{url:"/_static/favicons/favicon-32x32.png",revision:"e329308917ffa92f6518b0a6046247f7"},{url:"/_static/illustrations/call-waiting.svg",revision:"bc1d08db6006f643c596558a8ce2115e"},{url:"/_static/illustrations/rocket-crashed.svg",revision:"e053e85f4f1874535226b0ad2d7c9a8f"},{url:"/_static/illustrations/work-from-home.jpg",revision:"1892fd363d13952e90f18ac23404e619"},{url:"/_static/og.jpg",revision:"a9e8e712d9af2fc448e52f06160e5fcd"},{url:"/constants.ts",revision:"45ff196571ef60b9e0500213a0634ed3"},{url:"/favicon.ico",revision:"6786dbd147bc4f2bda288a45c68ae582"},{url:"/site.webmanifest",revision:"61cbdddc04b264abbb122be7cda8f15c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
