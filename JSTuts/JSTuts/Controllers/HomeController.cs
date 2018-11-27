using JSTuts.Models;
using System.Web.Mvc;

namespace JSTuts.Controllers
{
    public class HomeController : Controller
    {

        EmployeeDB empDB = new EmployeeDB();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var data = empDB.ListAll();
            return Json(data, JsonRequestBehavior.AllowGet);
            //return Json(empDB.ListAll(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult Add(Employee emp)
        {
            return Json(empDB.Add(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var employee = empDB.ListAll().Find(x => x.EmployeeID.Equals(ID));
            return Json(employee, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Employee emp)
        {
            return Json(empDB.Update(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(empDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }



        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}