import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ProductCard = ({
  key,
  id,
  name,
  category,
  description,
  price,
  sellerId,
  image,
}) => {
  const navigate = useNavigate()
  return (
    <Card className="mt-6 w-96 flex-cols justify-between">
      <CardHeader color="blue-gray" className="h-56">
        <img
          src={image}
          alt="Product Image"
          className="rounded-lg w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <Typography className="mb-2 text-blue-800 font-bold uppercase">
          {category}
        </Typography>
        <Typography>{`${description.substring(0, 40)}`} ...</Typography>
        <Typography className="mb-2 font-medium uppercase">
          Rp. {price}
        </Typography>
      </CardBody> 
      <CardFooter className="pt-0">
        <Button onClick={()=> navigate(`/marketplace/products/${id}`)}>Baca Lebih Lanjut</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
