const routeData = {
  left: [
    { id: 1, title: "01. Dark Side 6a (Jacob) ss ⭐⭐⭐", desc: "A nice warmup. Start on obvious jug with bad feet and traverse around the corner on underclings. Spicy finish!", video: "./vids/map1_1.mp4" },
    { id: 2, title: "02. Font 6b 7a (Jeremy) ss ⭐⭐", desc: "Start as for Dark Side. Do a hard move to a crimp and mantel out right.", video: "./vids/map2_1.mp4" },
    { id: 3, title: "03. Golden Boy 7b+ (Dom) ⭐⭐", desc: "Morpho! Stand up on bad undercling and find the hold.", video: "./vids/map3_1.mp4" },
    { id: 4, title: "04. There is a spoon project ⭐", desc: "Jeremy has gotten close. Bad gaston in the overhang is the only hope. Start on the ledge.", video: "./vids/map4_1.mp4" },
    { id: 5, title: "05. Ladyboy 7b (Jacob) ss ⭐⭐⭐", desc: "The best climb on the bloc! Sit start on the jug and climb straight up. Big committing move of a bad crimp to finish.", video: "./vids/map5_1.mp4" },
    { id: 6, title: "06. Ladyboy left 7a (Jacob) ⭐⭐", desc: "An easier version of lady boy. Start on the ledge and traverse right until you can finish as ladyboy.", video: "./vids/map6_1.mp4" },
    { id: 7, title: "07. Paddaman left 7c+ (Ben) ⭐⭐", desc: "An easier version of Paddaman Start as Ladyboy left and traverse right to finish as Paddaman.", video: "./vids/map7_1.mp4" },
    { id: 8, title: "08. Paddaman 7c+ (Ben) ss ⭐⭐⭐", desc: "The 👑 line! Start as Ladyboy and break into the middle of the face of the crimp. Finish straight up off a large move on the slopey gaston.", video: "./vids/map8_1.mp4" }
  ],
  main: [
    { id: 5, title: "05. (main face) Ladyboy 7b (Jacob) ss ⭐⭐⭐", desc: "The best climb on the bloc! Sit start on the jug and climb straight up. Big committing move of a bad crimp to finish.", video: "./vids/map5-main_1.mp4" },
    { id: 8, title: "08. (main face) Paddaman 7c+ (Ben) ss ⭐⭐⭐", desc: "The 👑 line! Start as Ladyboy and break into the middle of the face of the crimp. Finish straight up off a large move on the slopey gaston.", video: "./vids/map8-main_1.mp4" },
    { id: 9, title: "09. Paddawan 7c (Jacob) ss ⭐", desc: "Climb as Paddaman until the final move and exit onto the right arete via thin holds and high heel. Easier but more committing than Paddaman.", video: "./vids/map9_1.mp4" },
    { id: 10, title: "10. Full Frontal 7c (Ben) ss ⭐⭐⭐", desc: "Start as Ladybug and pull into Paddaman via a large jug in the face.", video: "./vids/map10_1.mp4" },
    { id: 11, title: "11. Drag 7a (Jacob) ss ⭐", desc: "Start as Ladyboy and finish as Ladybug via the large jug in the face.", video: "./vids/map11_1.mp4" },
    { id: 12, title: "12. Ladybug 6c (Jacob) ss ⭐⭐⭐", desc: "Dyno out to the sloper in the face and follow the seam right.", video: "./vids/map12_1.mp4" },
    { id: 13, title: "13. The inner machinations of my mind are an enigma 7a (Jacob) ss ⭐", desc: "The first climb done on the bloc. Do a big move out left and finish on the right side of the boulder via some fun compression.", video: "./vids/map13_1.mp4" }
  ],
  right: [
    { id: 14, title: "14. Dogshit 7b ss (Jacob)", desc: "Truly unremarkable. Only look at this once you have done everything else.", video: "./vids/map14_1.mp4" }
  ]
};

const routeNav = document.getElementById("routeNav");
const routeTitle = document.getElementById("route-title");
const routeDesc = document.getElementById("route-description");
const routeVideo = document.getElementById("route-video");

// Fullscreen on tap (mobile friendly)
routeVideo.addEventListener("click", () => {
  if (routeVideo.requestFullscreen) {
    routeVideo.requestFullscreen();
  } else if (routeVideo.webkitEnterFullscreen) {
    routeVideo.webkitEnterFullscreen(); // iOS Safari
  }
});


let currentFace = "left";

function loadRoutes(face) {
  routeNav.innerHTML = "";
  currentFace = face;

  routeData[face].forEach((route, index) => {
    const btn = document.createElement("button");
    btn.className = "route-btn";
    btn.textContent = route.id;

    btn.addEventListener("click", () => selectRoute(route, btn));

    if (index === 0) {
      btn.classList.add("active");
      selectRoute(route, btn);
    }

    routeNav.appendChild(btn);
  });
}


function selectRoute(route, btn) {
  document.querySelectorAll(".route-btn").forEach(b =>
    b.classList.remove("active")
  );
  btn.classList.add("active");

  routeTitle.textContent = route.title;
  routeDesc.textContent = route.desc;

  // Stop and reset video
  routeVideo.pause();
  routeVideo.removeAttribute("src");
  routeVideo.load();

  routeVideo.onloadeddata = () => {
  routeVideo.play().catch(() => {});
};

  // iOS-safe settings
  routeVideo.muted = true;
  routeVideo.playsInline = true;
  routeVideo.setAttribute("playsinline", "");
  routeVideo.setAttribute("webkit-playsinline", "");

  // Set new source
  routeVideo.src = route.video;
  routeVideo.load();

  // Try play
  routeVideo.play().catch(err => {
    console.log("Mobile autoplay blocked:", err);
  });
}

document.querySelectorAll(".face-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".face-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    loadRoutes(link.dataset.face);
  });
});

loadRoutes("left");
