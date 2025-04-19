import { useState, useEffect } from 'react';
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

const getDefaultTheme = () => {
  const storedPrefs = window.localStorage.getItem("color-theme");
  if (typeof storedPrefs === "string") {
    return storedPrefs;
  }
  const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
  if (userMedia.matches) {
    return "dark";
  }
  return "light"; // default to "light" if no preference is stored and user doesn't prefer dark
}


export default function RTE({name, control, label, defaultValue =""}) {

  
  const [theme, setTheme] = useState(getDefaultTheme());

  

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.type === 'theme-change') {
        setTheme(getDefaultTheme());
      }
    };

    window.addEventListener('theme-change', handleStorageChange);

    return () => {
      window.removeEventListener('theme-change', handleStorageChange);
    };
  }, []);
  
    
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'><span className='text-red-500 pr-1'>*</span>{label}</label>}

    <Controller 
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        key={theme}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color:${theme === 'dark' ? '#D1D5DB' : '#000'}`,
            skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
            content_css: theme === 'dark' ? 'dark' : 'default',
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
