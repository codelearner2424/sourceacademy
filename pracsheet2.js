// Page 1 to 11
//recursive binary search array
function binary_search(A, v) {
    function search(low, high) { 
        if (low > high) {
            return false; 
        } else {
            const mid = math_floor((low + high) / 2); 
            return (v === A[mid]) ||
            (v < A[mid]
            ? search(low, mid - 1)
            : search(mid + 1, high));
            return search(0, array_length(A) - 1); 
        }
    }
    return search(0, array_length(A) - 1);
}

//loop binary search array

function binary_search(A, v) { 
    let low = 0;
    let high = array_length(A) - 1;
    while (low <= high) {
        const mid = math_floor((low + high) / 2 ); 
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1; 
        } else {
            low = mid + 1; 
        }
    }
    return (low <= high); 
}

//selection sort array

function selection_sort(A) { 
    const len = array_length(A);
    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1); 
        swap(A, i, min_pos);
    }
}

function swap(A, x, y) { 
    const temp = A[x]; 
    A[x] = A[y];
    A[y] = temp;
}

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) { 
            min_pos = j;
        } 
    }
    return min_pos;
}

function insertion_sort(A) { 
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) { 
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) 
        { 
            swap(A, j, j + 1);
            j = j - 1;
        }
    } 
}

function insertion_sort2(A) { 
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) { 
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j]; // shift right
            j = j - 1; 
        }
        A[j + 1] = x; 
    }
}


function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function merge_sort_helper(A, low, high) { 
    if (low < high) {
        const mid = math_floor((low + high) / 2); 
        merge_sort_helper(A, low, mid); 
        merge_sort_helper(A, mid + 1, high); 
        merge(A, low, mid, high);
    } 
}

function merge(A, low, mid, high) { 
    const B = []; // temporary array let left = low;
    let right = mid + 1;
    let Bidx = 0;
    while (left <= mid && right <= high) { 
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1; 
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1; 
    }
    
    while (left <= mid) { 
        B[Bidx] = A[left]; Bidx = Bidx + 1; left = left + 1;
    }
    
    while (right <= high) { 
        B[Bidx] = A[right]; Bidx = Bidx + 1; right = right + 1;
    }
    
    for (let k = 0; k < high - low + 1; k = k + 1) { 
        A[low + k] = B[k];
    } 

}

function memoize(f) { 
    const mem = [];
    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x]; 
        } else {
            const result = f(x); 
            mem[x] = result; 
            return result;
        } 
    }
    return mf; 
}

function mfib(n) {
// array mem serves as memory for // already computed results of fib
    const mem = [];
    function fib(k) {
        // test if fib(k) has been computed already
        if (mem[k] !== undefined) {
        return mem[k]; // just access memory
        } else { // compute fib and add result to mem const result =
        k <= 1 ? k : fib(k - 1) + fib(k - 2); mem[k] = result;
            return result;
        }
    }
    return fib(n);
}


const mtrib = memoize(n => 
                    n === 0 ? 0
                    : n === 1 ? 1
                    : n === 2 ? 1
                    : mtrib(n - 1) + mtrib(n - 2) + mtrib(n - 3));
                  
// Page 12 - 19
// n choose k with memoization
function choose(n, k) {
    return k > n
        ? 0
        : k === 0 || k === n
        ? 1
        : choose(n - 1, k) + choose(n - 1, k - 1);
}

// Read and Write from/to Global 2-D Array

const mem = [];

function read(n, k) {
    return mem[n] === undefined
        ? undefined
        : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function mchoose(n, k) {
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = k > n ? 0
                     : k === 0 || k === n ? 1
                     : mchoose(n - 1, k) +
                       mchoose(n - 1, k - 1);
        write(n, k, result);
        return result;
    }
}


function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
        
}


// find smallest element of non-empty list xs
function smallest(xs) {
    return accumulate((x, y) => x < y ? x : y, head(xs), tail(xs));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
        
    }
}


function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)),merge_sort(drop(xs, mid)));
    }
}


function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y
               ? pair(x, merge(tail(xs), ys))
               : pair(y, merge(xs, tail(ys)));
    }
}

function middle(n) {
    return math_floor(n / 2);
}

// put the first n elements of xs into a list
function take(xs, n) {
    return n === 0
    ? null 
    : pair(head(xs), take(tail(xs), n - 1));
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    return n === 0
    ? xs
    : drop(tail(xs), n - 1);
}
                 
                    
                    
// Page 20-33
// Basic stream functions
function stream_tail(stream) {
    return tail(stream)();
}

function enum_stream(low, hi) {
    return low > hi
        ? null
        : pair(low, () => enum_stream(low + 1, hi));
}

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)),
               () => stream_map(f, stream_tail(s)));
}

function stream_filter(p, s) {
    return is_null(s)
        ? null
        : p(head(s))
            ? pair(head(s),
                   () => stream_filter(p, stream_tail(s)))
            : stream_filter(p, stream_tail(s));
}

function eval_stream(s, n) {
    return n === 0
        ? null
        : pair(head(s),
               eval_stream(stream_tail(s), n - 1));
}

function integers_from(n) {
    return pair(n, () => integers_from(n + 1));
}

// Stream application example
function fibgen(a, b) {
    return pair(a, () => fibgen(b, a + b));
}

const fibs = fibgen(0, 1);

eval_stream(fibs, 10); // list(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)


function more(a, b) {
    return (a > b)
        ? more(1, 1 + b)
        : pair(a, () => more(a + 1, b));
}

const more_and_more = more(1, 1);

eval_stream(more_and_more, 15); //list(1, 1, 2, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 5)

function replace(s, a, b) {
    return is_null(s) 
        ? null
        : pair((head(s) === a) ? b : head(s),
            () => replace(stream_tail(s), a, b));
}

const s = replace(more_and_more, 1, 0);

display_list(eval_stream(s, 15)); //list(0, 0, 2, 0, 2, 3, 0, 2, 3, 4, 0, 2, 3, 4, 5)

function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
        ? s1
        : pair(head(s1) + head(s2),
               () => add_streams(stream_tail(s1), 
                                 stream_tail(s2)));
}

function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

function is_divisible(x, y) {
    return x % y === 0;
}

function sieve(s) {
    return pair(head(s),
        () => sieve(stream_filter(
                        x => !is_divisible(x, head(s)),
                        stream_tail(s))));
}


const primes = sieve(integers_from(2));

eval_stream(primes, 10); //list(2, 3, 5, 7, 11, 13, 17, 19, 23, 29)

// Squareroot Newton's Method
function improve(guess, x) {
    return average(guess, x / guess);
}
function sqrt_iter(guess, x) {
    if (good_enough(guess, x)) {
        return guess;
    } else {
        return sqrt_iter(improve(guess, x), x);
    }
}
function sqrt(x) {
    return sqrt_iter(1.0, x);
}

// Streams version
function average(a, b) {
    return (a + b) / 2;
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function sqrt_stream(x) {
    const guesses = pair(1.0, 
        () => stream_map(guess => improve(guess, x), 
                         guesses));
    return guesses;
}

eval_stream(sqrt_stream(2), 6);

// Another example
function partial_sums(s) {
    return pair(head(s), 
    () => stream_map(x => x + head(s), partial_sums(stream_tail(s))));

}

function scale_stream(s, f) {
    return stream_map(x => x * f, s);
}

function pi_summands(n) {
    return pair(1 / n,
        () => stream_map(x => -x, pi_summands(n + 2)));
}
    
const pi_stream = scale_stream(partial_sums(pi_summands(1)), 4);

// Trees
function count_data_items(tree) {
    return is_null(tree)
           ? 0
           : ( is_list(head(tree))
               ? count_data_items(head(tree))
               : 1 )
             +
             count_data_items(tail(tree));
}

function map_tree(fun, tree) {
    return map(sub_tree =>
                   !is_list(sub_tree)
                   ? fun(sub_tree)
                   : map_tree(fun, sub_tree),
               tree);
}

function scale_tree(tree, k) {
    return map_tree(data_item => data_item * k,
                    tree);
}
const treeC = list(list(1, 2), null, 3, list(4, null));
count_data_items(treeC);