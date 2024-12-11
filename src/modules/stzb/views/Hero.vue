<template>
  <div class="hero">
    <h1>hero page</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>John Doe</td>
        <td>30</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Los Angeles</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Sam Johnson</td>
        <td>40</td>
        <td>Chicago</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.hero {
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd; /* Add border to the table */

  }
  th, td {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-left: none;
    border-right: none;
    //border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  //tr:nth-child(even) {
  //  background-color: #f9f9f9;
  //}
  //tr:hover {
  //  background-color: #ddd;
  //}
}
</style>
