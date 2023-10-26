function zip_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1),
                    () => pair(head(stream_tail(s2)),
                               () => zip_streams(stream_tail(s1), stream_tail(s2))));
    }

}

function zip_list_of_streams(ss) {
    return pair(head(head(ss)),
                () => zip_list_of_streams(append(tail(ss),
                                          list(stream_tail(head(ss))))));
}
const ones = pair(1, () => ones);
const twos = pair(1, () => twos);
const threes = pair(1, () => threes);


 

function partial_sums(s) {
    return pair(head(s),
                    () => add_streams(stream_tail(s),
                                            partial_sums(s)));
}
eval_stream(partial_sums(integers), 10);