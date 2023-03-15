import { TabsProps } from "../types";
import "./tabs.css";


function Tabs({ selectedTab, handleTabClick }: TabsProps) {
  
  return (
    <div className="tabs-container">
      <h1 className="title-tabs">Photos</h1>
      <div className="tabs">
        <button
          onClick={() => handleTabClick("recently-added")}
          className={selectedTab === "recently-added" ? "tab-active" : "tab"}
        >
          Recently Added
        </button>
        <button
          onClick={() => handleTabClick("favorited")}
          className={selectedTab === "favorited" ? "tab-active" : "tab"}
        >
          Favorited
        </button>
      </div>
    </div>
  );
}

export default Tabs;
