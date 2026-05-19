import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Model from "../../components/Model.jsx";
import AdminMenu from "./AdminMenu.jsx";
const CategoryList = () => {
  const { data: catigories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modelVisible, setModelVisible] = useState(false);

  const [craeteCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handelCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await craeteCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed. try Again");
    }
  };

  const HandelUpdateCategory = async (e) => {
    e.preventDefault();

    if (!selectedCategory?._id) {
      toast.error("No category selected");
      return;
    }
    if (!updateName) {
      toast.error("Category is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        name: updateName,
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdateName("");
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(" Update failed. try Again");
    }
  };
  const handelDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Deleted Successfully`);
        setSelectedCategory(null);
        setModelVisible(false);
      }
    } catch (error) {
      toast.error(error?.data?.error || error.message);
      toast.error("Category deletion faild.Try Again");
    }
  };

  return (
    <div className="ml-40 flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handelSubmit={handelCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {catigories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModelVisible(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => {
              setUpdateName(value);
            }}
            handelSubmit={HandelUpdateCategory}
            buttonText="Update"
            handelDelete={handelDeleteCategory}
          />
        </Model>
      </div>
    </div>
  );
};

export default CategoryList;
