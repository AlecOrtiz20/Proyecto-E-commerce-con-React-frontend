

import { Navigate, useNavigate, useParams } from 'react-router';
import { useProductById } from '@/admin/hooks/useProductById';
import { FormProduct } from './componentsProduct/FormProduct';
import { Spinner } from '@/components/ui/spinner';
import type { Product } from '@/shopFrontend/types/product.type';
import { toast } from 'sonner';



export const AdminProductPage = () => {
  const { id } = useParams();
  const idProduct = id ?? "";

  const navigate = useNavigate();

  const isNewProduct = id === "new";

  const {data: productData, isLoading, isError, mutationUpdate} = useProductById(idProduct);

  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  
  const handleSubmitForm = async (productLike: Partial<Product> & { files?: File[] }) => {
      
      

      const { files, ...productData } = productLike;
      console.log(productLike);
      await mutationUpdate.mutateAsync({...productData, id: idProduct, files: files}, {
        onSuccess: () => {
          toast.success(isNewProduct ? "Producto creado con exito" : "Producto actualizado con exito", {
            position: "top-right"
          })
          navigate(`/admin/products/${id}`);
        },
        onError: () => {
          toast.error("Error al actualizar producto");
        }
      });


  };

  if(isNewProduct){
    const emptyProducts: Product = {
      id: "new",
      title: '',
      description: '',
      gender: '',
      price: 0,
      stock: 0,
      tags: [],
      sizes: [],
      slug: "",
      images: [],
      user: {
        id: '',
        email: '',
        fullName: '',
        isActive: true,
        roles: []
      }
    };

    return (
      <FormProduct 
      productTitle={productTitle} 
      productSubtitle={productSubtitle} 
      product={emptyProducts}
      onSubmit={handleSubmitForm}
      isDisabled={mutationUpdate.isPending}
      />
    );
  }



  if(isError){
    return <Navigate to='/admin/products'/>
  }

  if(isLoading){
    return <Spinner className='mx-auto text-blue-500'/>
  }

  if (!productData) {
    return <Navigate to='/admin/products' />;
  }



  const product = productData;

  return (
    <FormProduct 
    productTitle={productTitle} 
    productSubtitle={productSubtitle} 
    product={product}
    onSubmit={handleSubmitForm}
    isDisabled={mutationUpdate.isPending}
    />
  );
};