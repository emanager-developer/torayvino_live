import{u as l,aC as o,j as e,S as c,L as t}from"./index-f981d823.js";function m(){var r,a;const{transactionId:i}=l(),{data:s,isLoading:n}=o(i);return n?e.jsx(c,{}):e.jsx("div",{className:"py-8",children:e.jsx("div",{className:"container",children:s&&((r=s==null?void 0:s.data)!=null&&r.isPaid)?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"max-w-md w-full space-y-8",children:[e.jsxs("div",{className:" flex flex-col items-center justify-center",children:[e.jsxs("svg",{className:"animate-draw",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 52 52",children:[e.jsx("circle",{className:"circle",cx:"26",cy:"26",r:"25",fill:"none"}),e.jsx("path",{className:"check",fill:"none",d:"M14.1 27.2l7.1 7.2 16.7-16.8"}),e.jsx("style",{children:`
                    .animate-draw {
                      width: 100px;
                      height: 100px;
                      stroke-dasharray: 166;
                      stroke-dashoffset: 166;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .circle {
                      stroke-dasharray: 157;
                      stroke-dashoffset: 157;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .check {
                      stroke-dasharray: 50;
                      stroke-dashoffset: 50;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 0.3s 0.9s forwards;
                    }
                    @keyframes draw {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `})]}),e.jsx("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Payment successful"}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Your transaction ID is"," ",e.jsx("span",{className:"font-semibold",children:(a=s==null?void 0:s.data)==null?void 0:a.transactionId})]})]}),e.jsxs("div",{className:"grid grid-cols-2 justify-center items-center gap-5",children:[e.jsx(t,{to:"/",children:e.jsx("button",{className:"w-full py-3 rounded-lg text-sm font-medium text-white bg-primary ",children:"Go back to home"})}),e.jsx(t,{to:"/shops",children:e.jsx("button",{className:"w-full py-3 rounded-lg text-sm font-medium text-white bg-gray-800 ",children:"Go back to Shop"})})]})]})}):e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"max-w-md w-full space-y-8",children:[e.jsxs("div",{className:" flex flex-col items-center justify-center",children:[e.jsxs("svg",{className:"animate-draw",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 52 52",children:[e.jsx("circle",{className:"circle",cx:"26",cy:"26",r:"25",fill:"none"}),e.jsx("path",{className:"cross",fill:"none",d:"M16 16 36 36 M36 16 16 36"}),e.jsx("style",{children:`
                    .animate-draw {
                      width: 100px;
                      height: 100px;
                      stroke-dasharray: 166;
                      stroke-dashoffset: 166;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .circle {
                      stroke-dasharray: 157;
                      stroke-dashoffset: 157;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .cross {
                      stroke-dasharray: 80;
                      stroke-dashoffset: 80;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 0.3s 0.9s forwards;
                    }
                    @keyframes draw {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `})]}),e.jsx("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Payment Failed"})]}),e.jsxs("div",{className:"grid grid-cols-2 justify-center items-center gap-5",children:[e.jsx(t,{to:"/",children:e.jsx("button",{className:"w-full py-3 rounded-lg text-sm font-medium text-white bg-primary ",children:"Go back to home"})}),e.jsx(t,{to:"/shops",children:e.jsx("button",{className:"w-full py-3 rounded-lg text-sm font-medium text-white bg-gray-800 ",children:"Go back to Shop"})})]})]})})})})}export{m as default};
