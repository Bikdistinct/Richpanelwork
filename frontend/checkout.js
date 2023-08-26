const checkout = (plan) => {
    if (selectedPlanPrice > 0) {
      fetch(
        "http://localhost:5000/api/v1/create-subscription-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ plan: selectedPlanPrice, customerId: userId }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          console.log(res);
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ session }) => {
          window.location = session.url;
        })
        .catch((e) => {
          console.log(e.error);
        });
    }
  }