// ************************************
// ************************************
// ************************************
// ************************************
// TODO: Make responsive (adjust for re-sizing of window)
//       -See vanilla VS version for reference.

import { useRef } from "react";
import gsap from "gsap";

import data from "./data";

// ==============================================

import "./index.scss";

// ==============================================

const App = () => {
  const div_refs = useRef([]);
  const arrow_refs = useRef([]);
  const prev_idx = useRef(null);
  const tl_prev = useRef(null);

  // --------------------------------------------

  const disableClick = (idx) => div_refs.current[idx].style.pointerEvents = "none";
  const enableClick  = (idx) => div_refs.current[idx].style.pointerEvents = "auto";

  // --------------------------------------------

  const f = (idx) => {
    if (tl_prev.current !== null) {
      disableClick(idx);
      tl_prev.current.reverse();
    }

    if (idx !== prev_idx.current) {

      const a = div_refs.current[idx].querySelector(".a");
      const height = div_refs.current[idx].offsetHeight + a.offsetHeight + 16; // + 1rem margin-bottom

      const tl = gsap.timeline();
      const duration = 0.33;

      disableClick(idx);

      tl.to(arrow_refs.current[idx], {
        rotate: "180deg",
        duration
      });

      tl.to(
        div_refs.current[idx],
        {
          height: `${height}px`,
          color: "#40bf57",
          onComplete: () => {
            tl_prev.current = tl;
            prev_idx.current = idx;
            enableClick(idx);
          },
          onReverseComplete: () => {
            enableClick(idx);
          },
          duration
        },
        "<="
      );
    } else {
      prev_idx.current = null; // allow to click same element after reverse on itself
      tl_prev.current = null; // don't reverse twice in a row
    } // if / else
  };

  // --------------------------------------------

  return (
    <div id="faq">
      <h5 id="faq-title">Frequently Asked Questions</h5>

      {data.map(({ q, a }, i) => (
        <div
          key={a}
          className="row"
          ref={(x) => (div_refs.current[i] = x)}
          onClick={() => f(i)}
        >
          <div className="q-container">
            <h5 className="q">
              {q}

              <p className="a">{a}</p>
            </h5>

            <div className="arrow-container">
              <svg
                className="arrow"
                ref={(x) => (arrow_refs.current[i] = x)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

// ==============================================

export default App;
