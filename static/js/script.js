$(document).ready(function () {
    $('.modal').modal();
    $('.sidenav').sidenav({
        edge: "right",
        inDuration: "750"
    });
});

(document).ready(function () {
    var str_amount;
    var amount;
    $('.sidenav').sidenav();

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, options);
    });

    $('.dropdown-trigger').dropdown();
    console.log("Sidebar and dropdown menu initialised");

    // Get Stripe publishable key
    fetch("/config/")
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            // Initialize Stripe.js
            const stripe = Stripe(data.publicKey);


            console.log("Stripe initialised");
            // Event handler
            document.querySelector("#submitBtn").addEventListener("click", () => {
                // Get user input amount, convert to integer, multiply by 100 for stripe compatibility
                str_amount = $('#amount').val();
                amount = parseInt(str_amount) * 100;
                // Get Checkout Session ID
                fetch("/create-checkout-session/?" + new URLSearchParams({
                        amount: amount,
                    }))
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        console.log(data);
                        // Redirect to Stripe Checkout
                        console.log("redirecting to Stripe checkout");
                        return stripe.redirectToCheckout({
                            sessionId: data.sessionId
                        });
                    })
                    .then((res) => {
                        console.log(res);
                    });
            });
        });
});