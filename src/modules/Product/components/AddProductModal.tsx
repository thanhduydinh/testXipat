import { createProduct } from "@/api/product";
import {
  Button,
  Modal,
  LegacyStack,
  DropZone,
  Frame,
  Image,
  TextField,
  Icon
} from "@shopify/polaris";
import { XSmallIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function AddProductModal() {
  const [active, setActive] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    value: "1",
    description: "",
    rules: [],
    errors: {
      title: "",
      value: "",
      description: "",
      dropZone: ""
    }
  });

  const toggleActive = useCallback(() => setActive(active => !active), []);
  const activator = <Button onClick={toggleActive}>Open</Button>;

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setFormData(prev => ({
        ...prev,
        errors: { ...prev.errors, dropZone: "Please upload a valid image file." }
      }));
    } else {
      setSelectedFiles(acceptedFiles);
      setFormData(prev => ({
        ...prev,
        errors: { ...prev.errors, dropZone: "" }
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const validateField = (key: string, value: string) => {
    let error = "";
    if (!value) {
      error = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
    }
    setFormData(prev => ({
      ...prev,
      errors: { ...prev.errors, [key]: error }
    }));
    return !error;
  };

  const validateFields = () => {
    const { title, value, description } = formData;
    const titleValid = validateField("title", title);
    const valueValid = validateField("value", value);
    const descriptionValid = validateField("description", description);
    const dropZoneValid =
      selectedFiles.length > 0 ||
      (setFormData(prev => ({
        ...prev,
        errors: { ...prev.errors, dropZone: "At least one image is required." }
      })),
      false);

    return titleValid && valueValid && descriptionValid && dropZoneValid;
  };

  const handleSubmit = useCallback(async () => {
    if (validateFields()) {
      const productData = {
        title: formData.title,
        price: Number(formData.value),
        description: formData.description,
        imageUrl: selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : "",
        createdAt: new Date().toISOString(),
        rules: []
      };

      const result = await createProduct(productData);

      if (result) {
        console.log("Form submitted:", result);
        toggleActive();
      }
    }
  }, [formData, selectedFiles]);

  const handleChange = (key: string, newValue: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: newValue,
      errors: { ...prev.errors, [key]: "" }
    }));
  };

  return (
    <Frame>
      <Modal
        size='large'
        activator={activator}
        open={active}
        onClose={toggleActive}
        title='Add product'
        primaryAction={{
          content: "Save",
          onAction: handleSubmit
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleActive
          }
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <TextField
              label='Title'
              value={formData.title}
              onChange={newValue => handleChange("title", newValue)}
              autoComplete='off'
              onBlur={() => validateField("title", formData.title)}
              error={formData.errors.title}
            />
            <TextField
              label='Price'
              type='number'
              value={formData.value}
              onChange={newValue => handleChange("value", newValue)}
              autoComplete='off'
              onBlur={() => validateField("value", formData.value)}
              error={formData.errors.value}
            />
            <DropZone
              label='Image'
              accept='.gif,.jpg,.jpeg,.png,.jfif'
              errorOverlayText={formData.errors.dropZone}
              type='image'
              onDrop={handleDrop}
            >
              <div className='flex flex-col justify-center items-center h-full p-5'>
                {selectedFiles.length > 0 ? (
                  selectedFiles.map((file, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <Image
                        source={URL.createObjectURL(file)}
                        alt={file.name}
                        width={75}
                        height={75}
                        className='h-20 w-20 object-cover mb-2'
                      />
                      <span className='font-semibold'>{file.name}</span>
                      <button
                        className='absolute top-0 right-0 h-6 w-6 flex items-center justify-center'
                        onClick={() => handleRemoveFile(index)}
                        aria-label='Remove file'
                      >
                        <Icon source={XSmallIcon} />
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <Button size='large' onClick={() => {}}>
                      Add file
                    </Button>
                    <p className='mt-2'>Accepts .gif, .jpg, .jpeg, .png, and .jfif</p>
                  </>
                )}
              </div>
            </DropZone>
            {formData.errors.dropZone && <p className='text-red-600'>{formData.errors.dropZone}</p>}
            <TextField
              label='Description'
              value={formData.description}
              onChange={newValue => handleChange("description", newValue)}
              autoComplete='off'
              multiline={4}
              onBlur={() => validateField("description", formData.description)}
              error={formData.errors.description}
            />
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </Frame>
  );
}

export default AddProductModal;
