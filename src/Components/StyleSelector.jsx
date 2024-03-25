import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { register } from "swiper/element/bundle";
import { Store } from "../App";

const StyleSelector = () => {
  const store = useContext(Store);
  const swiperRef = useRef(null);
  const [size, setSize] = useState(null);
  const [ActiveIndex, setActiveIndex] = useState(0);

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
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView: 4,
        },
      },
      on: {
        slideChange: () => {
          setActiveIndex(swiperRef.current.swiper.activeIndex);
        },
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);
  

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div>
      <div className="slider-arrow">
        {size <= 768 && (
          <>
            <button onClick={handlePrev} className="swiper-button-prev">
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </>
        )}
        <div className="slider-container-all">
          <swiper-container init="false" ref={swiperRef}>
            {store.DataSofa
              ? store.DataSofa.map((item, index) => {
                  if (store.CurrentStyle === null && ActiveIndex === 0 && index === 0) {
                    store.setCurrentStyle(item.name);
                    store.setCurrentSofa(item);
                  } else if (
                    store.CurrentStyle === null &&
                    ActiveIndex === index &&
                    size >= 769
                  ) {
                    store.setCurrentStyle(item.name);
                    store.setCurrentSofa(item);
                  } else if (
                    store.CurrentStyle &&
                    ActiveIndex === index &&
                    size <= 768
                  ) {
                    store.setCurrentStyle(item.name);
                    store.setCurrentSofa(item);
                  }
                  return (
                    <swiper-slide key={index}>
                      <div
                        onClick={() => {
                          store.setCurrentStyle(item.name);
                          store.setCurrentSofa(item);
                        }}
                        className={
                          store.CurrentStyle === item.name
                            ? "sofas-styles-selector sofas-styles-selector-active"
                            : "sofas-styles-selector"
                        }
                      >
                        <img
                          src={item.sofaContent.gallery[0].mediaItemUrl}
                          alt={item.name}
                        />
                        <h3>{item.name}</h3>
                      </div>
                    </swiper-slide>
                  );
                })
              : null}
          </swiper-container>
        </div>

        {size <= 768 && (
          <>
            <button onClick={handleNext} className="swiper-button-next">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </>
        )}
      </div>

      {size <= 768 ? (
        <p
          className="sofa-content"
          dangerouslySetInnerHTML={{
            __html: store.CurrentSofa?.sofaContent?.information,
          }}
        />
      ) : null}
    </div>
  );
};

export default StyleSelector;
