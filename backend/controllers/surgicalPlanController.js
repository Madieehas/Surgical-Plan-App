const SurgicalPlan = require("../models/SurgicalPlan");

// CREATE (already done, kept for safety)
exports.createPlan = async (req, res) => {
  try {
    const { title, description, patientId } = req.body;

    const plan = await SurgicalPlan.create({
      title,
      description,
      patientId,
      doctorId: req.user.id,
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PLANS (DOCTOR ONLY VIEW ALL)
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SurgicalPlan.findAll();

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY PLANS (PATIENT VIEW ONLY OWN DATA)
exports.getMyPlans = async (req, res) => {
  try {
    const plans = await SurgicalPlan.findAll({
      where: { patientId: req.user.id }
    });

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PLAN
exports.updatePlan = async (req, res) => {
  try {
    const plan = await SurgicalPlan.findByPk(req.params.id);

    if (!plan) return res.status(404).json({ error: "Plan not found" });

    await plan.update(req.body);

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PLAN
exports.deletePlan = async (req, res) => {
  try {
    const plan = await SurgicalPlan.findByPk(req.params.id);

    if (!plan) return res.status(404).json({ error: "Plan not found" });

    await plan.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};