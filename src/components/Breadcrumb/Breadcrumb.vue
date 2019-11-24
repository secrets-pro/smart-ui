<script>
import ImageIcon from "../Icon/ImageIcon.vue";

export default {
  name: "sm-breadcrumb",
  props: {
    items: Array
  },
  components: {
    "sm-img-icon": ImageIcon
  },
  render(h) {
    let child = [
      h("a", [
        h("sm-img-icon", {
          props: {
            name: "back",
            size: "16",
            theme: "dark"
          },
          on: {
            click: () => {
              if (this.$router) {
                this.$router.go(-1);
              }
            }
          },
          style: {
            marginRight: "12px",
            verticalAlign: "sub"
          }
        })
      ])
    ];
    for (let index in this.items) {
      child.push(
        h(
          "a",
          {
            on: {
              click: () => {
                let to = this.items[index].to;
                if (to) {
                  if (this.$router) {
                    this.$router.push({ path: to, query: this.$route.query });
                  }
                }
              }
            },
            class: {
              cursor: !!this.items[index].to
            }
          },
          this.items[index].label
        )
      );
      if (index < this.items.length - 1) {
        child.push(h("span", { class: "sm-breadcrumb-split" }, "/"));
      }
    }
    return h(
      "div",
      {
        class: "sm-breadcrumb"
      },
      child
    );
  }
};
</script>
