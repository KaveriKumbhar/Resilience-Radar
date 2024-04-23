import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import { cardDB } from "../../Temp/cardsData";
import CardModel from "./CardModel";

const Cards2 = ({ ul, canCommit }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardsData, setCardsData] = useState(cardDB);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log("this is url : " + ul)
  useEffect(() => {
    try {
      fetch(ul, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(response);
          return response.json();
        })
        .then((data) => {
          // Check if data.message exists and show error if true
          console.log(data)
          if (data.error) {
            setErrorMessage(data.error);
            setOpen(true);
          } else if (data.message) {
            setErrorMessage(data.message);
            setOpen(true);
          } else {
            // Remove extra quotes from img attribute
            const formattedData = data.map((item) => ({
              ...item,
              img: item.img.replace(/"/g, ""), // Remove all quotes from img attribute
            }));
            setCardsData(formattedData);
            console.log(formattedData);
          }

        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    } catch (error) {
      console.log(error);
    }
  }, [ul]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleClose}
        message={errorMessage}
      />
      <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5  row-cols-xl-5  gap-4 items-center justify-center my-4 p-2 ">
        {cardsData.map((card) => {
          return (
            <CardModel key={card._id} {...card} _id={card._id} canCommit={canCommit} />
          );
        })}
      </div>
    </>
  );
};

export default Cards2;
