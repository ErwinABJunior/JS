using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

namespace JSTuts.Models
{
    public class EmployeeDB
    {

        string conectionString = ConfigurationManager.ConnectionStrings["ADONET"].ConnectionString;

        public List<Employee> ListAll()
        {
            List<Employee> lst = new List<Employee>();

            using (SqlConnection con = new SqlConnection(conectionString))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Selectemployee", con);
                com.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();

                while (rdr.Read())
                {
                    lst.Add(new Employee
                    {

                        EmployeeID = Convert.ToInt32(rdr["EmployeeID"]),
                        Name = rdr["Name"].ToString(),
                        Age = Convert.ToInt32(rdr["Age"]),
                        State = rdr["State"].ToString(),
                        Country = rdr["Country"].ToString(),
                    });

                }

                return lst;
            }

        }
        public int Add(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(conectionString))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Insertupdateemployee", con);
                com.CommandType = System.Data.CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", emp.EmployeeID);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@Age", emp.Age);
                com.Parameters.AddWithValue("@State", emp.State);
                com.Parameters.AddWithValue("@Country", emp.Country);
                com.Parameters.AddWithValue("@Action", "Insert");

                i = com.ExecuteNonQuery();
            }
            return i;
        }


        public int Update(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(conectionString))
            {
                con.Open();
                SqlCommand com = new SqlCommand("Insertupdateemployee", con);

                com.CommandType = System.Data.CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", emp.EmployeeID);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@Age", emp.Age);
                com.Parameters.AddWithValue("@State", emp.State);
                com.Parameters.AddWithValue("@Country", emp.Country);
                com.Parameters.AddWithValue("@Action", "Update");

                i = com.ExecuteNonQuery();

            }
            return i;
        }

        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(conectionString))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = System.Data.CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}