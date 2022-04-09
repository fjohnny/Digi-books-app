import Vue from "vue";
import routes from "./routes";
import { timingSafeEqual } from "crypto";

Vue.component("select-category", {
  props: {
    id: Math.random().toString(),
    value: null,
    toptext: String,
  },

  template: `
      <select :value="value" @input="$emit('changed',$event.target.value)">
        <option selected value="">{{toptext}}</option>
        <option value="income">Income</option>
        <option disabled>──────────</option>
        <option value="rent">Rent and Outgoings</option>
        <option value="materials">GFS, Parts & Materials</option>
        <option value="software">Software</option>
        <option value="hardware">Hardware</option>
        <option value="utilities">Utitlies</option>
        <option value="maintenance">Maintenance</option>
        <option value="tools">Tools</option>
        <option value="stationary">Stationary</option>
        <option value="transport">Transport</option>
        <option value="security">Security</option>
        <option value="insurance">Insurance</option>
        <option value="xpos">XPOS</option>
        <option value="fees">Bank Fees</option>
        <option value="education">Education</option>
        <option value="hosting">Hosting and Domains</option>
        <option value="marketing">Marketing</option>
        <option value="tax">Taxation</option>
        <option value="other">Other</option>
        <option disabled>──────────</option>
        <option value="wages">Wages</option>
        <option value="private">Private</option>
      </select>  
  `,
});

const app = new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
    categoriesCredit: ["income"],
    categoriesDebit: [
      "rent",
      "materials",
      "software",
      "hardware",
      "utilities",
      "maintenance",
      "tools",
      "stationary",
      "transport",
      "security",
      "insurance",
      "xpos",
      "fees",
      "education",
      "hosting",
      "marketing",
      "tax",
      "wages",
      "private",
    ],
    categoryTitles: [
      { income: "Income" },
      { rent: "Rent" },
      { materials: "Good for Sale, Part & Materials" },
      { software: "Software" },
      { hardware: "Hardware" },
      { utilities: "Utilities" },
      { maintenance: "Maintenance" },
      { tools: "Tools" },
      { stationary: "Stationary & Postage" },
      { transport: "Car expenses & transport" },
      { security: "Security" },
      { insurance: "Insurance" },
      { xpos: "Xpos" },
      { fees: "Bank Fees" },
      { education: "Education" },
      { hosting: "Hosting and Domains" },
      { marketing: "Marketing" },
      { tax: "Tax" },
      { wages: "Wages" },
      { private: "Private expenses" },
    ],
    transactions: [
      {
        id: 1,
        date: "12/09/2018",
        description: "PayPal Payment",
        debit: 80.0,
        credit: 0.0,
        category: "materials",
        isSelected: false,
      },
      {
        id: 2,
        date: "14/09/2018",
        description: "POS 14/09/2018",
        debit: 0.0,
        credit: 500.0,
        category: "income",
        isSelected: false,
      },
      {
        id: 3,
        date: "15/09/2018",
        description: "Electricity shop",
        debit: 250.5,
        credit: 0.0,
        category: "",
        isSelected: false,
      },
      {
        id: 4,
        date: "15/09/2018",
        description: "ATM Withdrawal",
        debit: 100.0,
        credit: 0.0,
        category: "",
        isSelected: false,
      },
      {
        id: 5,
        date: "18/09/2018",
        description:
          "This is one really really long transaction credit description",
        debit: 0.0,
        credit: 1000.0,
        category: "",
        isSelected: false,
      },
      {
        id: 2,
        date: "20/09/2018",
        description: "POS 20/09/2018",
        debit: 0.0,
        credit: 380.2,
        category: "",
        isSelected: false,
      },
      {
        id: 2,
        date: "21/09/2018",
        description: "POS 21/09/2018",
        debit: 0.0,
        credit: 820.0,
        category: "",
        isSelected: false,
      },
    ],
    transaction: {},
    selectedCategory: "",
    allSelected: false,
    debitOnly: false,
    creditOnly: false,
    uncategorisedOnly: false,
    descriptionLike: "",
    action: "create",
    message: "Welcome",
    csvLoading: { is: false },
    catSumm: "",
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute];
      return matchingView
        ? require("./pages/" + matchingView + ".vue")
        : require("./pages/404.vue");
    },

    filteredTransactions: function () {
      console.log("Computing the filtered list");
      return this.transactions.filter((item) => {
        return (
          (!this.uncategorisedOnly || item.category == "") && //uncategorised filter
          (!this.creditOnly || item.credit != 0) && //credit filter
          (!this.debitOnly || item.debit != 0) && //debit filter
          (this.descriptionLike == "" ||
            item.description
              .toLowerCase()
              .indexOf(this.descriptionLike.toLowerCase()) > -1) //description filter
        );
      });
    },

    totalCredits() {
      let total = 0;
      this.transactions.forEach((t) => {
        total = total + t.credit;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    totalDebits() {
      let total = 0;
      this.transactions.forEach((t) => {
        total = total + t.debit;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  methods: {
    setAllCategories() {
      var selection = this.selectedCategory;
      if (selection == "") {
        selection = "UNCATEGORISED";
      }

      if (
        confirm(
          `Category ${selection.toUpperCase()} will be applied to ${
            this.filteredTransactions.length
          } selected transactions. OK?`
        )
      ) {
        this.filteredTransactions.forEach((t) => {
          if (t.isSelected) {
            t.category = this.selectedCategory;
          }
        });
      }
    },

    selectUndefined() {
      this.filteredTransactions.forEach((t) => {
        t.isSelected = t.category == "";
      });
    },

    selectAll(checked) {
      this.filteredTransactions.forEach((t) => {
        t.isSelected = checked;
      });
    },

    totalCategoryDebit(cat) {
      let total = 0;
      this.transactions.forEach((t) => {
        if (cat.toLowerCase() == t.category.toLowerCase()) {
          total = total + t.debit;
        }
      });
      if (total != 0) {
        return total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      } else {
        return "";
      }
    },

    totalCategoryCredit(cat) {
      let total = 0;
      this.transactions.forEach((t) => {
        if (cat.toLowerCase() == t.category.toLowerCase()) {
          total = total + t.credit;
        }
      });
      if (total != 0) {
        return total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      } else {
        return "";
      }
    },

    getCategoryTitle(category) {
      //const res = this.categoryTitles[category];
      const res = this.categoryTitles.find((c) => c[category]);
      console.log({ res });
      //console.log(category, { res });
      //console.log(Object.keys(this.categoryTitles));
      //console.log(this.categoryTitles);
      return res[category];
    },

    importCSV() {
      var isLoading = this.csvLoading;
      isLoading.is = true;
      this.transactions = [];
      var list = this.transactions;
      console.log("prepare to import - read the file");
      d3.csv("/CSVData_2019-2020.csv")
        .then(function (data) {
          console.log("file read - start importing"); // [{"Hello": "world"}, …]
          data.forEach((t) => {
            if (t.t_amount > 0) {
              var newT = {
                id: Math.random().toString(),
                date: t.t_date,
                description: t.t_desc,
                credit: parseFloat(t.t_amount),
                debit: 0,
                category: "",
                isSelected: false,
              };
              console.log(newT);
              list.push(newT);
            } else {
              var newT = {
                id: Math.random().toString(),
                date: t.t_date,
                description: t.t_desc,
                credit: 0,
                debit: -parseFloat(t.t_amount),
                category: "",
                isSelected: false,
              };
              console.log(newT);
              list.push(newT);
            }
          });
          isLoading.is = false;
        })
        .catch((error) => {
          console.log("error has occured: ", error);
          isLoading.is = false;
        });
    },

    saveFile(filename) {
      var rows = this.transactions;
      var filename = "transactions.csv";
      var processRow = function (row) {
        console.log("ROW - > " + row);
        var finalVal = "";
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? "" : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ",";
          finalVal += result;
        }
        console.log("FINAL - > " + finalVal);
        return finalVal + "\n";
      };

      var csvFile = "";
      for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
      }

      var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },

    saveFile2() {
      function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
          return null;
        }

        columnDelimiter = args.columnDelimiter || ",";
        lineDelimiter = args.lineDelimiter || "\n";

        keys = Object.keys(data[0]);

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
          ctr = 0;
          keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
          });
          result += lineDelimiter;
        });

        return result;
      }
      var data, filename, link;

      var csv = convertArrayOfObjectsToCSV({
        data: this.transactions,
      });
      if (csv == null) return;

      filename = "transactions.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = "data:text/csv;charset=utf-8," + csv;
      }
      data = encodeURI(csv);

      link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    printDocument() {
      $(".sidebar").removeClass("visible");
      $(".mygrid").removeClass("grid");
      window.print();
      $(".sidebar").addClass("visible");
      $(".mygrid").addClass("grid");
    },

    loadFile() {
      var isLoading = this.csvLoading;
      isLoading.is = true;
      this.transactions = [];
      var list = this.transactions;
      console.log("prepare to load - read the file");
      d3.csv("/transactions.csv")
        .then(function (data) {
          console.log("file read - start loading"); // [{"Hello": "world"}, …]
          data.forEach((t) => {
            if (t.credit > 0) {
              var newT = {
                id: Math.random().toString(),
                date: t.date,
                description: t.description,
                credit: parseFloat(t.credit),
                debit: 0,
                category: t.category,
                isSelected: false,
              };
              //console.log(newT);
              list.push(newT);
            } else {
              var newT = {
                id: Math.random().toString(),
                date: t.date,
                description: t.description,
                credit: 0,
                debit: parseFloat(t.debit),
                category: t.category,
                isSelected: false,
              };
              //console.log(newT);
              list.push(newT);
            }
          });
          isLoading.is = false;
        })
        .catch((error) => {
          console.log("error has occured: ", error);
          isLoading.is = false;
        });
    },

    testEvent() {
      $(document).ready(function () {
        $("#paginate").DataTable({
          pagingType: "full_numbers",
        });
      });
    },
  },

  watch: {
    allSelected: function (val) {
      this.filteredTransactions.forEach((t) => {
        t.isSelected = val;
      });
    },

    debitOnly: function (val) {
      if (val) {
        this.creditOnly = false;
      }
    },

    creditOnly: function (val) {
      if (val) {
        this.debitOnly = false;
      }
    },
  },

  mounted() {
    this.allSelected = true;
  },

  render(h) {
    return h(this.ViewComponent);
  },
});

window.addEventListener("popstate", () => {
  app.currentRoute = window.location.pathname;
});
