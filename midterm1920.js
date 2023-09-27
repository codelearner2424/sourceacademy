// Rercursive
function get_sub_list(start, end, L) {
    function helper(pos, ys) {
        if (pos < start) {
            return helper(pos + 1, tail(ys));
        } else if (pos <= end) {
            return pair(head(ys), helper(pos + 1, tail(ys)));
        } else {
            return null;
        }
    }
    return helper(0, L);
}

get_sub_list(1,3,list(1,2,3,4));

//Iterative
function get_sublist(start, end, L) {
    function helper(pos, ys, result) {
        if (pos < start) {
        return helper(pos + 1, tail(ys), result);
        } else if (pos <= end) {
        return helper(pos + 1, tail(ys), pair(head(ys), result));
        } else {
        return reverse(result);
        }
    }
    return helper(0, L, null);
}
list();

function make_active_list(L) {
    const len = length(L);
    return x => {
      if ((x < 0) || (x >= len)) {
          return null;
      } else {
          return list_ref(L, x);
      }
    };
}

make_active_list(list(8,3,5))(0);

function take(xs, n) {
return (n === 0) ? null : pair(head(xs), take(tail(xs), n - 1));
}
function drop(xs, n) {
return (n === 0) ? xs : drop(tail(xs), n - 1);
}
function insertions(x, ys) {
    const i_list = build_list(x => x, length(ys) + 1);
    return map(a => append(take(ys, a), pair(x, drop(ys, a))), i_list);
}

insertions(4, list(1,2,3));

function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const nested = map(x => insertions(head(xs), x), permutations(tail(xs)));
        return accumulate(append, null, nested);
        
    }
}

permutations(list(1,2,3));