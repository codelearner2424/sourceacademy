function make_ring(state, id) {
    return pair(state, id);
}
function ring_state(ring) {
    return head(ring);
}
function ring_id(ring) {
    return tail(ring);
}
function make_uniform_configuration(state, n) {
    const ordered = build_list(x => x + 1, n);
    const rev = reverse(ordered);
    return map(x => make_ring(state, x), rev);
}
make_uniform_configuration("on", 3);
function make_uniform_configuration2(state, n) {
    return build_list(i => make_ring(state, n - i), n);

}
make_uniform_configuration2("on", 3);
function make_free_configuration(first_state, n) {
    if (n === 0) {
        return null;
    } else {
        if (first_state === "off") {
            return make_uniform_configuration("off", n);
        } else {
            const first_on = make_ring("on", n);
            return pair(first_on, make_uniform_configuration("off", n - 1));
        }
    }
}

make_free_configuration("on", 3);

function check_free_configuration(first_state, rings) {
    if (is_null(rings)) {
        return true;
    } else {
        const has_correct_state = ring_state(head(rings)) === first_state;
        const has_correct_length = ring_id(head(rings)) === length(rings) && ring_id(list_ref(rings, length(rings) - 1)) === 1;
        const all_remaining_off = accumulate((x, acc) => head(x) === "off", true, tail(rings));
        const indexes = map(x => ring_id(x), rings);
        const is_descending = tail(accumulate((x, acc) => pair(x, (x >= head(acc) && tail(acc)))
                                                         ,pair(list_ref(indexes, length(rings) - 1), true)
                                                         ,indexes));
        return has_correct_length && has_correct_length && all_remaining_off && is_descending;
    }
}
const rings1 = list(make_ring("on", 2), make_ring("off", 0));
check_free_configuration("on", rings1);


// function is_descending(xs) {
//     return accumulate((x, acc) => pair(x, (x >= head(acc)) && tail(acc)), pair(list_ref(xs, length(xs) -1, true), xs);
    
// }

// is_descending(list(3,3,-3));



function make_step(action, id) {
    return pair(action, id);
}
function step_action(step) {
    return head(step);
}
function step_id(step) {
    return tail(step);
}
function step_to_string(step) {
    const action = step_action(step);
    const id = step_id(step);
    return action + " ring " + stringify(id);
    
}

const step1 = make_step("insert", 3);
const step2 = make_step("insert", 2);
const step3 = make_step("insert", 1);

function steps_to_string(steps) {
    const list_steps_word = map(x => step_to_string(x) + "\n", steps);
    return accumulate((x, acc) => x + acc, '', list_steps_word);
}
steps_to_string(list(step1, step2, step3));


function flip(ring) {
    const state = ring_state(ring);
    const id = ring_id(ring);
    return state === "on" ? make_step("remove", id) : make_step("insert", id);
}
flip(make_ring("on", 4));


function steps_to_free_configuration(desired_first_step, rings) {
    if (is_null(rings)) {
        return null;
    } else if (length(rings) === 1) {
        if (desired_first_step === ring_state(head(rings))) {
            return null;
        } else {
            return list(flip(head(rings)));
        }
    } else {
        if (desired_first_step === "off") {
            if (ring_state(head(rings)) === "off") {
                return steps_to_free_configuration("off", tail(rings));
            } else {
                return append(steps_to_free_configuration("off", tail(rings)), list(flip(head(rings))));
            }
        } else {
            if (ring_state(head(rings)) === "off") {
                return append(steps_to_free_configuration("off", tail(rings)), list(flip(head(rings))));
            } else {
                return steps_to_free_configuration("off", tail(rings));
            }
        }
    }
}
steps_to_free_configuration("off", make_uniform_configuration("on", 9));
//desired - on
// given on on => on off
// given off off => on off
// guven off on => on off

//desired = off
//given any => off off off.....

// on on on => off off off











