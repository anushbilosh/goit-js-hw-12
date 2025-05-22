import{a as c,S as f,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();c.defaults.baseURL="https://pixabay.com/api/";const p="50358414-c92bcdcb4052cd5a2ab490d79";async function m(s){const o={params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}};try{return(await c.get("",o)).data}catch(e){throw console.log(e),e}}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),y=new f(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const o=s.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${e.webformatURL}"
                    alt="${e.tags}"
                />
            </a>
            <div class="image-info">
                <p><b>Likes:</b> ${e.likes}</p>
                <p><b>Views:</b> ${e.views}</p>
                <p><b>Comments:</b> ${e.comments}</p>
                <p><b>Downloads:</b> ${e.downloads}</p>
            </div>
        </li>`).join("");l.insertAdjacentHTML("beforeend",o),y.refresh()}function h(){l.innerHTML=""}function b(){u.classList.add("active")}function L(){u.classList.remove("active")}const d=document.querySelector(".form"),w=d.elements["search-text"];d.addEventListener("submit",v);async function v(s){s.preventDefault();const o=w.value.trim();if(o===""){n.warning({message:"Please enter a search term!",position:"topRight"});return}b(),console.log("showLoader called"),h();try{const e=await m(o);if(e.hits.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(e.hits)}catch{n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{L()}}
//# sourceMappingURL=index.js.map
