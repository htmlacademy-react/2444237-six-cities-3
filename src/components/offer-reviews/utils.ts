import { OfferComment } from "@/types/comment";
import { MAX_COMMENTS_COUNT } from "./const";

export const getPrepareComments = (comments: OfferComment[]) => {
    const preparedComments = [...comments]
    return preparedComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COMMENTS_COUNT);
}
