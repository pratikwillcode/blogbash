import React, { useCallback } from 'react'
import { set, useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from 'react-feather'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
            topic: post?.topic || '',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disableSubmit, setDisableSubmit] = React.useState(false)

    const submit = async (data) => {

        if (post) {
            setLoading(true)
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                createdOn: post.createdOn,
                authorName: post.authorName,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                setLoading(false)
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            if (!data.image || !data.image.length > 0 || !data.content || !data.slug || !data.title) return setError(true)
            setError(false)
            setLoading(true)
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    authorName: userData.name,
                    createdOn: new Date().toISOString(),
                })
                if (dbPost) {
                    setLoading(false)
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')

        return ''
    }, []);

    React.useEffect(() => {
        setValue('slug', slugTransform(post?.title || ''))
    }, [])

    React.useEffect(() => {
        const subscription = watch(((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title),
                    { shouldValidate: true })
            }
        }))
        return () => subscription.unsubscribe()

    }, [watch, slugTransform, setValue])
    return (
        <div>
            {loading ? <div className=' w-full h-screen flex items-center justify-center'> <div className=' flex justify-center items-center'>
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...
                    </span>
                </div>
                <div className=' px-1'>
                    Loading
                </div>
            </div>
            </div> :

                <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col md:flex-row lg:px-8 px-4 pb-4 ">
                    <div className="w-full md:w-2/3 px-2">
                        <Input
                            label="Topic :"
                            placeholder="Topic"
                            className="mb-4"
                            {...register("topic", { required: false })}
                        />
                        <Input
                            label="Title :"
                            placeholder="Title"
                            className="mb-4"
                            isMandatory={true}
                            {...register("title", { required: false })}
                        />
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            isMandatory={true}
                            {...register("slug", { required: false })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    <div className="md:w-1/3 px-2 md:py-0 py-4">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="mb-4 cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            isMandatory={true}
                            {...register("image", { required: false })}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <img
                                    src={appwriteService.getFilePreviewUrl(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-4 cursor-pointer"
                            {...register("status", { required: true })}
                        />
                        <div className='flex gap-4 py-7'>

                            <Button type="submit" bgColor={post ? "bg-green-500  " : ' bg-blue-500'} className="w-full " dynamicClasses={`${post ? ' ' : ''}`}>
                                {post ? "Update" : "Submit"}
                            </Button>
                            <Button type="button" bgColor='bg-gray-200 ' textColor='text-black ' dynamicClasses='border-2 ' onClick={() => {
                                if (post) {
                                    navigate(`/post/${post.$id}`)
                                } else {
                                    navigate(`/`)
                                }
                            }}
                                className="w-full ">
                                Cancel
                            </Button>
                        </div>
                        {error && <p className="text-red-500">Please fill all the mandatory fields that are marked as (*)</p>}
                    </div>
                </form>}
        </div>
    );
}

export default PostForm