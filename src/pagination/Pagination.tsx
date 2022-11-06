import { FC } from "react";
import { PaginationProps } from "../interfaces/Props";
import "./Pagination.css";

const Pagination: FC<PaginationProps> = ({ activePage, pages, setData }) => {

  const getPages = () => {
    const elements = [];

    for (let i = 1; i <= pages; i++) {
      elements.push(
        <div
          key={i}
          className={`${activePage === i ? "active" : ""}`}
          onClick={() =>
            setData({
              payload: i,
              name: "activePage",
            })
          }
        >
          {i}
        </div >
      );
    }
    return elements;
  };

  return (
    <section className="pagination">
      <Arrow
        setData={setData}
        class={activePage === 1}
        condition={activePage !== 1}
        payload={activePage - 1}
      >
        {"<"}
      </Arrow>
      {getPages()}
      <Arrow
        setData={setData}
        class={activePage === pages}
        condition={activePage !== pages}
        payload={activePage + 1}
      >
        {">"}
      </Arrow>
    </section>
  );
};

const Arrow = (props: { class: boolean; condition: boolean; setData: (arg0: { payload: number; name: string; }) => any; payload: number; children: string; }) => (
  <div
    className={`pagination-arrow ${props.class ? "inactive" : ""}`}
    onClick={() =>
      props.condition &&
      props.setData({
        payload: props.payload,
        name: "activePage",
      })

    }
  >
    {props.children}
  </div>
)

export { Pagination }