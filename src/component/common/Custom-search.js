import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useHttp from "../../hooks/use-http";
const CustomSearchBar = ({
  // endpointAPI = "/clubs/search",
  setKeyword = () => {},
  
  // dataResponseHandle = (res) => res?.data?.clubs,
  // onValueIsSelected = (v) => {
  //   console.log(v);
  // },
  // onBaseSearch = ["name"],
  debounceTime = 500,
  isSearch = false,
}) => {
  // const API = useHttp();
  // const [suggestions, setSuggestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fetchTimeout, setFetchTimeout] = useState(null);
  // console.log(suggestions);
  // const fetchSuggestions = async (keyword) => {
  //   // console.log(keyword);
  //   try {
  //     API.sendRequest(
  //       { type: "POST", endpoint: endpointAPI },
  //       (res) => {
  //         setSuggestions(dataResponseHandle(res));
  //       },
  //       { keyword }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching suggestions:", error);
  //   }
  // };
  const handleSearchChange = (value) => {
    // console.log(value);
    clearTimeout(fetchTimeout);
    setSearchKeyword(value);
    const timeout = setTimeout(() => {
      if (isSearch) {
        setKeyword(value);
      }
    }, debounceTime);
    setFetchTimeout(timeout);
  };
  // const handleSelect = (value) => {
  //   const selectedItem = suggestions.find((item) => {
  //     let nestedValue = item;
  //     for (let i = 0; i < onBaseSearch.length; i++) {
  //       nestedValue = nestedValue[onBaseSearch[i]];
  //       if (!nestedValue) {
  //         return false;
  //       }
  //     }
  //     return nestedValue === value;
  //   });
  //   onValueIsSelected(selectedItem);
  // };
  useEffect(() => {
    return () => {
      clearTimeout(fetchTimeout);
    };
  }, [fetchTimeout]);
  const getNestedValue = (obj, path) => {
    let value = obj;
    for (let i = 0; i < path.length; i++) {
      value = value[path[i]];
      if (!value) {
        return undefined;
      }
    }
    return value;
  };
  return (
    <>
      <AutoComplete
        className="z-40"
        // options={suggestions?.map((item) => ({
        //   value: getNestedValue(item, onBaseSearch),
        // }))}
        // onSelect={handleSelect}
        onChange={handleSearchChange}
        onClick={() => {
          // console.log("object");
        }}
        value={searchKeyword}
        style={{ width: "100%" }}
      >
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined className="text-gray-500" />}
        />
      </AutoComplete>
    </>
  );
};
export default CustomSearchBar;
