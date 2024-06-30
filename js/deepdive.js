import gsap from "gsap";

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(".nav-bar", { y: "-100%" }, { y: "0%" });
t1.fromTo("#card1", { opacity: 0 }, { opacity: 1 });

t1.fromTo("#card2", { opacity: 0 }, { opacity: 1 });

t1.fromTo("#card3", { opacity: 0 }, { opacity: 1 });

t1.fromTo("#card4", { opacity: 0 }, { opacity: 1 });
