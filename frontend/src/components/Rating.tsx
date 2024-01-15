import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface RatingProps {
  value: number;
  text: string;
  iconFontSize: number;
}

const ratingArray = [1, 2, 3, 4, 5];


const Rating: FunctionComponent<RatingProps> = ({ value, text, iconFontSize }) => {
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" my={0.5}>
      {ratingArray.map((index) => (
        <Box  key={index} color={"gold"}>
          {value >= index ? (
            <StarIcon style={{fontSize: iconFontSize}}/>
          ) : value >= index - 0.5 ? (
            <StarHalfIcon style={{fontSize: iconFontSize}}/>
          ) : (
            <StarBorderIcon style={{fontSize: iconFontSize}}/>
          )}
        </Box>
      ))}
      <Typography fontSize={15} ml={0.5}>{text && text}</Typography>
    </Box>
  );
};

export default Rating;
