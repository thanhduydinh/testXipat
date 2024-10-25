import { Button, Modal, LegacyStack, TextField, Icon, ButtonGroup } from "@shopify/polaris";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import { AddRulesModalProps, FormDataProps, ProductDataProps } from "./type";

function AddRulesModal({ isActive, onClose, onSubmit, productData }: AddRulesModalProps) {
  const initialFormData = {
    titleCampaign: "",
    startDate: "0",
    endDate: "0",
    rules: [{ buyFrom: 0, buyTo: 0, discountPerItem: 0 }],
    errors: {
      titleCampaign: "",
      startDate: "",
      endDate: ""
    }
  };
  const [formData, setFormData] = useState<FormDataProps>(initialFormData);

  useEffect(() => {
    const updatedFormData: FormDataProps = {
      titleCampaign: productData?.titleCampaign || initialFormData.titleCampaign,
      startDate: productData?.startDate?.toString() || initialFormData.startDate,
      endDate: productData?.endDate?.toString() || initialFormData.endDate,
      rules: productData?.rules || initialFormData.rules,
      errors: initialFormData.errors
    };

    setFormData(updatedFormData);
  }, [productData]);

  const validateField = (key: string, value: string) => {
    let error = "";
    const numericValue = Number(value);

    if (!value) {
      error = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
    } else if (numericValue <= 0) {
      error = `${key.charAt(0).toUpperCase() + key.slice(1)} must be greater than 0.`;
    }

    setFormData(prev => ({
      ...prev,
      errors: { ...prev.errors, [key]: error }
    }));

    return !error;
  };

  const validateFields = () => {
    const { titleCampaign, startDate, endDate, rules } = formData;
    const titleValid = validateField("titleCampaign", titleCampaign);
    const startDateValid = validateField("startDate", startDate);
    const endDateValid = validateField("endDate", endDate);

    const ruleErrors = rules.map((rule, index) => ({
      buyFrom: validateField(`buyFrom_${index}`, rule.buyFrom.toString()),
      buyTo: validateField(`buyTo_${index}`, rule.buyTo.toString()),
      discount: validateField(`discount_${index}`, rule.discountPerItem.toString())
    }));

    setFormData(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...ruleErrors.reduce(
          (acc, err, index) => ({
            ...acc,
            [`buyFrom_${index}`]: err.buyFrom ? "" : `${index + 1}st rule buyFrom is invalid.`,
            [`buyTo_${index}`]: err.buyTo ? "" : `${index + 1}st rule buyTo is invalid.`,
            [`discount_${index}`]: err.discount ? "" : `${index + 1}st rule discount is invalid.`
          }),
          {}
        )
      }
    }));

    const rulesValid = ruleErrors.every(err => err.buyFrom && err.buyTo && err.discount);

    return titleValid && startDateValid && endDateValid && rulesValid;
  };

  const handleSubmit = useCallback(async () => {
    if (validateFields()) {
      const newProductData: ProductDataProps = {
        id: productData?.title || crypto.randomUUID(),
        title: productData?.title || "",
        price: productData?.price || 0,
        description: productData?.description || "",
        imageUrl: productData?.imageUrl || "",
        titleCampaign: formData.titleCampaign,
        startDate: Number(formData.startDate),
        endDate: Number(formData.endDate),
        createdAt: new Date().toISOString(),
        rules: formData.rules
      };

      await onSubmit(newProductData);
      onClose();
    }
  }, [formData, productData, onClose, onSubmit]);

  const handleChange = (key: string, newValue: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: newValue,
      errors: { ...prev.errors, [key]: "" }
    }));
  };

  const handleRuleChange = (index: number, key: string, newValue: string) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = { ...updatedRules[index], [key]: Number(newValue) };
    validateField(`${key}_${index}`, newValue);
    setFormData(prev => ({ ...prev, rules: updatedRules }));
  };

  const handleRemoveRule = (index: number) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      rules: updatedRules
    }));
  };

  const handleAddRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, { buyFrom: 0, buyTo: 0, discountPerItem: 0 }]
    }));
  };

  return (
    <Modal
      size='large'
      open={isActive}
      onClose={onClose}
      title='Add product'
      primaryAction={{
        content: "Save",
        onAction: handleSubmit
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose
        }
      ]}
    >
      <Modal.Section>
        <LegacyStack vertical>
          <LegacyStack vertical spacing='extraTight'>
            <div className='flex gap-6 mb-4'>
              <div className='w-[201px]'>
                <TextField
                  label='Title Campaign'
                  value={formData.titleCampaign}
                  onChange={newValue => handleChange("titleCampaign", newValue)}
                  autoComplete='off'
                  onBlur={() => validateField("titleCampaign", formData.titleCampaign)}
                  error={formData.errors.titleCampaign}
                />
              </div>
              <TextField
                label='Start Date'
                type='number'
                min={0}
                value={formData.startDate}
                onChange={newValue => handleChange("startDate", newValue)}
                autoComplete='off'
                onBlur={() => validateField("startDate", formData.startDate)}
                error={formData.errors.startDate}
              />
              <TextField
                label='End Date'
                type='number'
                min={0}
                value={formData.endDate}
                onChange={newValue => handleChange("endDate", newValue)}
                autoComplete='off'
                onBlur={() => validateField("endDate", formData.endDate)}
                error={formData.errors.endDate}
              />
            </div>

            {formData.rules.map((rule, index) => (
              <div key={index} className='flex items-center gap-6 mb-2'>
                <TextField
                  label='Buy from'
                  type='number'
                  min={0}
                  value={rule.buyFrom.toString()}
                  onChange={newValue => handleRuleChange(index, "buyFrom", newValue)}
                  autoComplete='off'
                  onBlur={() => validateField(`buyFrom_${index}`, rule.buyFrom.toString())}
                  error={formData.errors[`buyFrom_${index}`]}
                />
                <TextField
                  label='Buy to'
                  type='number'
                  min={0}
                  value={rule.buyTo.toString()}
                  onChange={newValue => handleRuleChange(index, "buyTo", newValue)}
                  autoComplete='off'
                  onBlur={() => validateField(`buyTo_${index}`, rule.buyTo.toString())}
                  error={formData.errors[`buyTo_${index}`]}
                />

                <TextField
                  label='Discount per item(%)'
                  type='number'
                  min={0}
                  value={rule.discountPerItem.toString()}
                  onChange={newValue => handleRuleChange(index, "discountPerItem", newValue)}
                  autoComplete='off'
                  onBlur={() => validateField(`discount_${index}`, rule.discountPerItem.toString())}
                  error={formData.errors[`discount_${index}`]}
                />
                <button
                  className='h-6 w-6 mt-6'
                  onClick={() => handleRemoveRule(index)}
                  aria-label='Remove rule'
                >
                  <Icon source={DeleteIcon} />
                </button>
              </div>
            ))}

            <ButtonGroup>
              <Button variant='primary' icon={PlusIcon} onClick={handleAddRule}>
                Add
              </Button>
            </ButtonGroup>
          </LegacyStack>
        </LegacyStack>
      </Modal.Section>
    </Modal>
  );
}

export default AddRulesModal;
