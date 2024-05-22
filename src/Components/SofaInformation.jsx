import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { register } from "swiper/element/bundle";
import { Store } from "../App";

const SofaInformation = () => {
  const store = useContext(Store);
  const verticalSwiperRef = useRef(null);
  const [CurrentSofa, setCurrentSofa] = useState(0);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    
    register();
    
    const params = {
      loop: true,
      autoplaySpeed: 3000,
      spaceBetween: "20px",
      onSwiper: (swiper) => {
        verticalSwiperRef.current = swiper;
      },
      breakpoints: {
        1: {
          slidesPerView: 1,
          direction: "horizontal",
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView: 4,
          direction: "vertical",
          verticalSwiping: true,
        },
      },
    };

    
    Object.assign(verticalSwiperRef.current, params);

    // initialize swiper
    verticalSwiperRef.current.initialize();
  }, []);

  /* const showModal = () => {
    document.getElementById("modal_product").showModal();
  }; */

  useEffect(() => {
    setCurrentSofa(0);
  }, [store.CurrentSofa]);

  return (
    <>
      <div className="sofa-information">
        <div className="vertical-slider">
          <swiper-container init="false" ref={verticalSwiperRef}>
            {store.CurrentSofa
              ? store.CurrentSofa.sofaContent.gallery.map((item, index) => {
                console.log(CurrentSofa)
                  return (
                    <swiper-slide class="item-slider" key={index}>
                      <div
                        onClick={() => setCurrentSofa(index)}
                        className={
                          CurrentSofa === index
                            ? "gallery-sofas gallery-sofas-active"
                            : "gallery-sofas"
                        }
                      >
                        <img src={item.mediaItemUrl} alt="" />
                      </div>
                    </swiper-slide>
                  );
                })
              : null}
          </swiper-container>
        </div>

        <div className="information">
          <div className="information-image">
            <img
              src={
                store.CurrentSofa?.sofaContent?.gallery[CurrentSofa]
                  ?.mediaItemUrl
              }
              alt={
                store.CurrentSofa ? store.CurrentSofa.sofaContent.name : null
              }
            />
          </div>
          <div className="information-content">
            <h2>
              {store.CurrentSofa?.sofaContent?.gallery[CurrentSofa]?.title}
            </h2>
            {/* <h5>${store.CurrentSofa?.sofaContent?.price}</h5> */}

            {size >= 768 ? (
              <p
              className="sofa-content"
                dangerouslySetInnerHTML={{
                  __html: store.CurrentSofa?.sofaContent?.information,
                }}
              />
            ) : null}

            <a
              href={store.CurrentSofa?.sofaContent?.link ? store.CurrentSofa?.sofaContent?.link : "https://shop.sofa.gruposantamaria.cr/collections"}
              target="_blank"
              rel="noreferrer"
              className="button-sofa" /* onClick={() => showModal()} */
            >
              <span>{store.CurrentSofa?.sofaContent?.button}</span>
            </a>
          </div>
        </div>
      </div>

      {/* <dialog id="modal_product" className="modal modal_product_container">
        <div className="modal-box w-11/12 max-w-[1500px]">
          <form method="dialog">
            
            <button className="btn close-x btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          perra form
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
    </>
  );
};

export default SofaInformation;
