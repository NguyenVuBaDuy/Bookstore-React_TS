import { getBookById } from "services/api.service"
import ViewBookDetail from "components/client/book/view.book.detail"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




const BookPage = () => {

    const _id = useParams()
    const [dataBook, setDataBook] = useState<IBookTable>({
        _id: '',
        thumbnail: '',
        slider: [],
        mainText: '',
        author: '',
        price: 0,
        sold: 0,
        quantity: 0,
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    useEffect(() => {
        if (_id) {
            const getDataBookById = async () => {
                const res = await getBookById(_id?.id)
                if (res.data) {
                    let data = res.data
                    data.items = getThumbnailAndSliders(data)
                    setDataBook(data)
                }
            }
            getDataBookById()
        }
    }, [])

    const getThumbnailAndSliders = (data: IBookTable) => {
        const images: IItems[] = []

        images.push(
            {
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            }
        )

        if (data.slider && data.slider.length > 0) {
            data.slider.map(item => {
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image"
                    }
                )
            })
        }
        return images
    }

    return (
        <ViewBookDetail
            dataBook={dataBook}
        />
    )
}

export default BookPage