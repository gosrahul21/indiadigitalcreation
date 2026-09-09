"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export interface JsonField {
  name: string;
  label: string;
  type: "text" | "textarea" | "image";
}

interface JsonArrayEditorProps {
  title: string;
  description?: string;
  fields: JsonField[];
  value: any[];
  onChange: (value: any[]) => void;
}

export default function JsonArrayEditor({ title, description, fields, value = [], onChange }: JsonArrayEditorProps) {
  const [items, setItems] = useState<any[]>(Array.isArray(value) ? value : []);

  const handleAddItem = () => {
    const newItem: any = {};
    fields.forEach(f => { newItem[f.name] = ""; });
    const newItems = [...items, newItem];
    setItems(newItems);
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
    onChange(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
    onChange(newItems);
  };

  const handleChange = (index: number, fieldName: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [fieldName]: val };
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div className="bg-surface-container-lowest border border-border-subtle p-space-lg flex flex-col space-y-space-md">
      <div className="border-b border-border-subtle pb-2 flex items-center justify-between">
        <div>
          <h2 className="font-label-lg uppercase tracking-wider text-text-editorial">{title}</h2>
          {description && <p className="font-body-sm text-text-muted mt-1">{description}</p>}
        </div>
        <button type="button" onClick={handleAddItem} className="bg-surface-deep border border-border-active hover:bg-primary-container hover:text-on-primary-fixed text-text-editorial px-space-md py-space-xs font-label-md uppercase tracking-wider transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Item
        </button>
      </div>

      <div className="flex flex-col space-y-space-md pt-space-xs">
        {items.length === 0 ? (
          <div className="text-center py-space-xl text-text-muted font-body-sm border border-dashed border-border-subtle">
            No items added yet. Click "Add Item" to start.
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="bg-surface-deep border border-border-subtle p-space-md relative group flex flex-col gap-space-sm">
              
              {/* Toolbar */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => handleMoveUp(index)} disabled={index === 0} className="w-8 h-8 flex items-center justify-center bg-surface-card hover:bg-surface-tint hover:text-on-primary-fixed text-text-editorial disabled:opacity-30">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button type="button" onClick={() => handleMoveDown(index)} disabled={index === items.length - 1} className="w-8 h-8 flex items-center justify-center bg-surface-card hover:bg-surface-tint hover:text-on-primary-fixed text-text-editorial disabled:opacity-30">
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
                <button type="button" onClick={() => handleRemoveItem(index)} className="w-8 h-8 flex items-center justify-center bg-surface-card hover:bg-error hover:text-on-error text-text-editorial ml-2">
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>

              <div className="font-label-sm text-primary-container uppercase tracking-widest mb-2">Item {index + 1}</div>

              {fields.map(field => (
                <div key={field.name} className="flex flex-col space-y-1">
                  <label className="font-label-sm uppercase text-text-muted">{field.label}</label>
                  
                  {field.type === "text" && (
                    <input 
                      type="text" 
                      value={item[field.name] || ""} 
                      onChange={e => handleChange(index, field.name, e.target.value)}
                      className="bg-surface text-text-editorial p-2 border border-border-subtle focus:border-border-active outline-none font-body-sm" 
                    />
                  )}

                  {field.type === "textarea" && (
                    <div className="flex flex-col gap-2">
                      <textarea 
                        rows={3} 
                        value={item[field.name] || ""} 
                        onChange={e => handleChange(index, field.name, e.target.value)}
                        className="bg-surface text-text-editorial p-2 border border-border-subtle focus:border-border-active outline-none font-body-sm resize-y" 
                      />
                      {field.name.toLowerCase().includes('image') && (
                        <div className="self-start">
                          <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset'}
                            onSuccess={(result: any) => {
                              if (result?.info?.secure_url) {
                                const currentVal = item[field.name] ? String(item[field.name]).trim() : "";
                                const newVal = currentVal 
                                  ? `${currentVal},\n${result.info.secure_url}` 
                                  : result.info.secure_url;
                                handleChange(index, field.name, newVal);
                              }
                            }}
                          >
                            {({ open }) => (
                              <button type="button" onClick={() => open()} className="bg-surface-card border border-border-subtle hover:border-primary-container text-text-muted hover:text-primary-container px-2 py-1 font-label-sm text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">add_photo_alternate</span>
                                Append Image to List
                              </button>
                            )}
                          </CldUploadWidget>
                        </div>
                      )}
                    </div>
                  )}

                  {field.type === "image" && (
                    <div className="flex items-center gap-space-sm">
                      <CldUploadWidget 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset'}
                        onSuccess={(result: any) => {
                          if (result?.info?.secure_url) {
                            handleChange(index, field.name, result.info.secure_url);
                          }
                        }}
                      >
                        {({ open }) => (
                          <button type="button" onClick={() => open()} className="bg-surface-card border border-border-active hover:bg-primary-container hover:text-on-primary-fixed text-text-editorial px-3 py-1.5 font-label-sm uppercase tracking-wider transition-colors flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">upload</span>
                            Upload
                          </button>
                        )}
                      </CldUploadWidget>
                      
                      {item[field.name] ? (
                        <div className="flex items-center gap-2">
                          <img src={item[field.name]} alt="" className="w-10 h-10 object-cover border border-border-subtle" />
                          <span className="font-body-sm text-surface-tint truncate max-w-xs">{item[field.name]}</span>
                          <button type="button" onClick={() => handleChange(index, field.name, "")} className="text-error hover:underline font-label-sm text-[10px] uppercase ml-2">Clear</button>
                        </div>
                      ) : (
                        <span className="font-body-sm text-text-muted italic">No image</span>
                      )}
                    </div>
                  )}

                </div>
              ))}

            </div>
          ))
        )}
      </div>
    </div>
  );
}
